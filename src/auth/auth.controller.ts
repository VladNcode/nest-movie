/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Roles } from '../decorators/roles.decorator';
import { hashPassword } from '../helpers/hashPassword';
import { UpdateUserEmailDto } from '../user/dto/update-user-email.dto';
import { UpdateUserPasswordDto } from '../user/dto/update-user-password.dto';
import { UserService } from '../user/user.service';
import { ACCOUNT_DELETED_SUCCESSFULLY, PASSWORD_UPDATED_SUCCESSFULLY } from './auth.constants';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(RolesGuard)
@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@HttpCode(200)
	@Post('login')
	async login(@Body() { username, password }: AuthDto) {
		const user = await this.userService.validateUser(username, password);
		return this.authService.login(user.email);
	}

	@Post('register')
	async register(@Body() dto: RegisterDto) {
		const existingUser = await this.userService.getUser(dto.username);
		if (existingUser) {
			throw new BadRequestException('User already exist');
		}

		const user = await this.authService.signup(dto);
		return { status: 'success', user };
	}

	@UseGuards(JwtAuthGuard)
	@Roles('admin')
	@Get('test')
	async test(@Request() req: { user: string }) {
		const email = req.user;
		// console.log(email);

		return { status: 'success' };
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updateEmail')
	async updateEmail(@Request() req: { user: string }, @Body() dto: UpdateUserEmailDto) {
		const oldEmail = req.user;
		const newEmail = dto.email;

		console.log(oldEmail, newEmail);

		const { passwordHash, ...user } = await this.userService.updateUserEmail(oldEmail, newEmail);
		return { status: 'success', user };
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updatePassword')
	async updatePassword(@Request() req: { user: string }, @Body() dto: UpdateUserPasswordDto) {
		const email = req.user;
		const hashedPassword = await hashPassword(dto.password);

		const { passwordHash, passwordChangedAt, ...user } = await this.userService.updateUserPassword(
			email,
			hashedPassword,
		);

		return { status: 'success', message: PASSWORD_UPDATED_SUCCESSFULLY, user };
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/deleteMe')
	@HttpCode(204)
	async deleteMe(@Request() req: { user: string }) {
		const email = req.user;
		console.log(email);
		await this.userService.deleteUserByEmail(email);

		return { status: 'success', message: ACCOUNT_DELETED_SUCCESSFULLY };
	}
}
