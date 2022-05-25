import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	ForbiddenException,
	HttpCode,
	Param,
	Patch,
	Post,
	Request,
	UnauthorizedException,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import { ApiTags } from '@nestjs/swagger';
import { randomBytes, createHash } from 'crypto';

import { UserService } from '../user/user.service';
import {
	ACCOUNT_DELETED_SUCCESSFULLY,
	EXPIRES_IN_10_MINUTES,
	PASSWORD_RESET_TOKEN_WAS_SENT,
	PASSWORD_UPDATED_SUCCESSFULLY,
} from './auth.constants';
import { USERNAME_OR_PASSWORD_IS_INCORRECT } from '../user/user.constants';
import { AuthService } from './auth.service';
import { Formatted, Passwords } from '../helpers';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { deleteMe, login, register, updateEmail, updatePassword } from '../swagger/auth/auth.decorators';

import { AuthDto, RegisterDto, UpdateUserEmailDto, UpdateUserPasswordDto } from 'src/exports/dto';
import { ReqUser, ReturnDeletedMessage, ReturnPasswordUpdate, ReturnSanitizedUser } from 'src/exports/interfaces';
import { EmailService } from '../email/email.service';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
		private readonly emailService: EmailService,
	) {}

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
	@Patch('/updateEmail')
	async updateEmail(@Request() req: ReqUser, @Body() dto: UpdateUserEmailDto): Promise<ReturnSanitizedUser> {
		const oldEmail = req.user.email;
		const newEmail = dto.email;
		const user = await this.userService.updateUserEmail({ oldEmail, newEmail });

		return Formatted.sanitizeUser(user);
	}

	@SwaggerDecorator(updatePassword)
	@Patch('/updatePassword')
	async updatePassword(@Request() req: ReqUser, @Body() dto: UpdateUserPasswordDto): Promise<ReturnPasswordUpdate> {
		const hashedPassword = await Passwords.hashPassword(dto.password);
		await this.userService.updateUserPassword({ email: req.user.email, password: hashedPassword });

		return Formatted.response({ message: PASSWORD_UPDATED_SUCCESSFULLY });
	}

	//TODO SWAGGER
	@Patch('/resetPassword/:token')
	async resetPassword(@Param() { token }: { token: string }, @Body() dto: UpdateUserPasswordDto) {
		const hashedToken = createHash('sha256').update(token).digest('hex');

		const user = await this.userService.getUserByToken(hashedToken);
		if (!user) {
			throw new ForbiddenException('Token is invalid or has expired');
		}

		const hashedPassword = await Passwords.hashPassword(dto.password);

		await this.userService.updateUserPassword({ email: user.email, password: hashedPassword });

		return Formatted.response({ message: PASSWORD_UPDATED_SUCCESSFULLY });
	}

	//TODO SWAGGER
	@Post('/forgotPassword')
	async forgotPassword(
		@Request() req: { protocol: string; get: (host: string) => string },
		@Body() { email }: UpdateUserEmailDto,
	): Promise<ReturnPasswordUpdate> {
		const user = await this.userService.getUser({ email });

		if (!user) {
			throw new BadRequestException('User not found!');
		}

		const resetToken = randomBytes(32).toString('hex');
		const url = `${req.protocol}://${req.get('host')}/api/auth/resetPassword/${resetToken}`;
		const passwordResetToken = createHash('sha256').update(resetToken).digest('hex');
		const passwordResetExpires = new Date(Date.now() + EXPIRES_IN_10_MINUTES);

		await this.userService.updateUser({ body: { passwordResetToken, passwordResetExpires }, id: user.id });
		await this.emailService.sendPasswordReset({ to: email, url });

		return Formatted.response({ message: PASSWORD_RESET_TOKEN_WAS_SENT });
	}

	@SwaggerDecorator(deleteMe)
	@Delete('/deleteMe')
	@HttpCode(204)
	async deleteMe(@Request() req: ReqUser): Promise<ReturnDeletedMessage<'message', string>> {
		await this.userService.deleteUserByEmail(req.user.email);
		return Formatted.response({ message: ACCOUNT_DELETED_SUCCESSFULLY });
	}
}
