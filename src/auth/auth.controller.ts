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
	UnauthorizedException,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { compare } from 'bcrypt';
import {
	ApiBearerAuth,
	ApiBody,
	ApiForbiddenResponse,
	ApiOperation,
	ApiProperty,
	ApiResponse,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UserService } from '../user/user.service';
import { ACCOUNT_DELETED_SUCCESSFULLY, PASSWORD_UPDATED_SUCCESSFULLY } from './auth.constants';
import { USER_NOT_FOUND, EMAIL_OR_PASSWORD_IS_INCORRECT } from '../user/user.constants';
import { AuthService } from './auth.service';
import { Formatted, Passwords } from '../helpers';
import { JwtAuthGuard } from './guards';
import { Auth } from '../decorators/apply.decorator';

import { AuthDto, RegisterDto, UpdateUserEmailDto, UpdateUserPasswordDto } from 'src/exports/dto';
import { ReqUser, ReturnDeletedMessage, ReturnPasswordUpdate, ReturnSanitizedUser } from 'src/exports/interfaces';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { errorForTest } from '../decorators/swagger-errors.interface';

export class ErrorDto {
	@ApiProperty({ example: 401 })
	statusCode: number;

	@ApiProperty({ example: 'Unauthorized' })
	message: string;
}

@UsePipes(new ValidationPipe({ transform: true }))
@Controller('auth')
export class AuthController {
	constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

	// @ApiUnauthorizedResponse({ description: 'Unauthorized.', type: AuthDto })
	// @ApiForbiddenResponse({
	// 	status: 401,
	// 	description: 'You are not allowed to use this route if you are not authenticated',
	// 	type: ErrorDto,
	// })
	// @ApiBearerAuth('access_token')
	// @ApiOperation({ summary: 'test' })
	// @ApiResponse({
	// 	status: 200,
	// 	description: 'Should be able to access thi route if logged in',
	// 	type: AuthDto,
	// })

	@SwaggerDecorator([errorForTest], {
		status: 200,
		description: 'Should be able to access this route if logged in',
		type: AuthDto,
	})
	@Auth('user')
	@Get('test')
	async test(@Request() req: ReqUser) {
		return { status: 'success', email: req.user.email, id: req.user.id };
	}

	@ApiBody({
		type: AuthDto,
		description: 'Store product structure',
	})
	@HttpCode(200)
	@Post('login')
	async login(@Body() { username, password }: AuthDto): Promise<{ access_token: string }> {
		const userExists = await this.userService.getUser({ username });
		if (!userExists) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}

		const isCorrectPassword = await compare(password, userExists.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(EMAIL_OR_PASSWORD_IS_INCORRECT);
		}

		return this.authService.login(userExists.email);
	}

	@Post('register')
	async register(@Body() dto: RegisterDto): Promise<ReturnSanitizedUser> {
		const existingUser = await this.userService.getUser({ username: dto.username });
		if (existingUser) {
			throw new BadRequestException('User already exist');
		}

		const user = await this.authService.signup(dto);

		return Formatted.sanitizeUser(user);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updateEmail')
	async updateEmail(@Request() req: ReqUser, @Body() dto: UpdateUserEmailDto): Promise<ReturnSanitizedUser> {
		const oldEmail = req.user.email;
		const newEmail = dto.email;
		const user = await this.userService.updateUserEmail({ oldEmail, newEmail });

		return Formatted.sanitizeUser(user);
	}

	@UseGuards(JwtAuthGuard)
	@Patch('/updatePassword')
	async updatePassword(@Request() req: ReqUser, @Body() dto: UpdateUserPasswordDto): Promise<ReturnPasswordUpdate> {
		const hashedPassword = await Passwords.hashPassword(dto.password);
		await this.userService.updateUserPassword({ email: req.user.email, password: hashedPassword });

		return Formatted.response({ message: PASSWORD_UPDATED_SUCCESSFULLY });
	}

	@UseGuards(JwtAuthGuard)
	@Delete('/deleteMe')
	@HttpCode(204)
	async deleteMe(@Request() req: ReqUser): Promise<ReturnDeletedMessage<'message', string>> {
		await this.userService.deleteUserByEmail(req.user.email);
		return Formatted.response({ message: ACCOUNT_DELETED_SUCCESSFULLY });
	}
}
