import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	HttpCode,
	Patch,
	Post,
	Request,
	UnauthorizedException,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { ACCOUNT_DELETED_SUCCESSFULLY, PASSWORD_UPDATED_SUCCESSFULLY } from './auth.constants';
import { USERNAME_OR_PASSWORD_IS_INCORRECT } from '../user/user.constants';
import { AuthService } from './auth.service';
import { Formatted, Passwords } from '../helpers';
import { JwtAuthGuard } from './guards';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { deleteMe, login, register, updateEmail, updatePassword } from '../swagger/auth/auth.decorators';

import { AuthDto, RegisterDto, UpdateUserEmailDto, UpdateUserPasswordDto } from 'src/exports/dto';
import { ReqUser, ReturnDeletedMessage, ReturnPasswordUpdate, ReturnSanitizedUser } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

	@SwaggerDecorator(login)
	@HttpCode(200)
	@Post('login')
	async login(@Body() { username, password }: AuthDto): Promise<{ access_token: string }> {
		const userExists = await this.userService.getUser({ username });
		if (!userExists) {
			throw new UnauthorizedException(USERNAME_OR_PASSWORD_IS_INCORRECT);
		}

		const isCorrectPassword = await compare(password, userExists.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(USERNAME_OR_PASSWORD_IS_INCORRECT);
		}

		return this.authService.login(userExists.email);
	}

	@SwaggerDecorator(register)
	@Post('register')
	async register(@Body() dto: RegisterDto): Promise<ReturnSanitizedUser> {
		const existingUser = await this.userService.getUser({ username: dto.username });
		if (existingUser) {
			throw new BadRequestException('User already exist');
		}

		const user = await this.authService.signup(dto);

		return Formatted.sanitizeUser(user);
	}

	@SwaggerDecorator(updateEmail)
	@UseGuards(JwtAuthGuard)
	@Patch('/updateEmail')
	async updateEmail(@Request() req: ReqUser, @Body() dto: UpdateUserEmailDto): Promise<ReturnSanitizedUser> {
		const oldEmail = req.user.email;
		const newEmail = dto.email;
		const user = await this.userService.updateUserEmail({ oldEmail, newEmail });

		return Formatted.sanitizeUser(user);
	}

	@SwaggerDecorator(updatePassword)
	@UseGuards(JwtAuthGuard)
	@Patch('/updatePassword')
	async updatePassword(@Request() req: ReqUser, @Body() dto: UpdateUserPasswordDto): Promise<ReturnPasswordUpdate> {
		const hashedPassword = await Passwords.hashPassword(dto.password);
		await this.userService.updateUserPassword({ email: req.user.email, password: hashedPassword });

		return Formatted.response({ message: PASSWORD_UPDATED_SUCCESSFULLY });
	}

	@SwaggerDecorator(deleteMe)
	@UseGuards(JwtAuthGuard)
	@Delete('/deleteMe')
	@HttpCode(204)
	async deleteMe(@Request() req: ReqUser): Promise<ReturnDeletedMessage<'message', string>> {
		await this.userService.deleteUserByEmail(req.user.email);
		return Formatted.response({ message: ACCOUNT_DELETED_SUCCESSFULLY });
	}
}
