import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	Request,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly userService: UserService,
		private readonly authService: AuthService,
	) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() { username, password }: AuthDto) {
		const user = await this.userService.validateUser(username, password);
		return this.authService.login(user.email);
	}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		const existingUser = await this.userService.findUser(dto.username);
		if (existingUser) {
			throw new BadRequestException('User already exist');
		}

		const user = await this.authService.signup(dto);
		return { status: 'success', user };
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	getProfile(@Request() req: any) {
		return { user: req.user };
	}
}
