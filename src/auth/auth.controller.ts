import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Post,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';

import { UserService } from '../user/user.service';
import { ACCOUNT_DELETED_SUCCESSFULLY, PASSWORD_UPDATED_SUCCESSFULLY } from './auth.constants';
import { AuthService } from './auth.service';
import { Roles } from '../decorators/roles.decorator';
import { Formatted, hashPassword } from '../helpers';
import { JwtAuthGuard, RolesGuard } from './guards';

import { AuthDto, RegisterDto, ReqUserDto, UpdateUserEmailDto, UpdateUserPasswordDto } from 'src/exports/dto';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
	constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { username, password }: AuthDto) {
		const user = await this.userService.validateUser(username, password);
		return this.authService.login(user.email);
	}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		const existingUser = await this.userService.getUser({ username: dto.username });
		if (existingUser) {
			throw new BadRequestException('User already exist');
		}

		const user = await this.authService.signup(dto);
		return Formatted.sanitizeUser(user);
	}

	@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@Get('test')
	async test(@Request() req: ReqUserDto) {
		return { status: 'success', email: req.user.email, id: req.user.id };
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updateEmail')
	async updateEmail(@Request() req: ReqUserDto, @Body() dto: UpdateUserEmailDto) {
		const oldEmail = req.user.email;
		const newEmail = dto.email;

		console.log(oldEmail, newEmail);

		const user = await this.userService.updateUserEmail(oldEmail, newEmail);
		return Formatted.sanitizeUser(user);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updatePassword')
	async updatePassword(@Request() req: ReqUserDto, @Body() dto: UpdateUserPasswordDto) {
		const hashedPassword = await hashPassword(dto.password);
		await this.userService.updateUserPassword(req.user.email, hashedPassword);

		return Formatted.response({ message: PASSWORD_UPDATED_SUCCESSFULLY });
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/deleteMe')
	@HttpCode(204)
	async deleteMe(@Request() req: ReqUserDto) {
		await this.userService.deleteUserByEmail(req.user.email);

		return { status: 'success', message: ACCOUNT_DELETED_SUCCESSFULLY };
	}
}
