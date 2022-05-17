import {
	Body,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
	UploadedFile,
	UseInterceptors,
	Headers,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { File } from '../helpers/file.helpers';
import { Formatted } from '../helpers/formatter.helpers';
import { UserCreateDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('/')
	async getUsers(@Query() query: FindUserDto) {
		const { skip, take, username, email, id, order } = query;

		const users = await this.userService.getUsers({
			skip: skip || 0,
			take: take || 100,
			where: { id, username, email },
			orderBy: { id: order },
		});

		return {
			status: 'success',
			data: {
				results: users.length,
				users,
			},
		};
	}

	@Get('/:id')
	async getUser(@Param('id', ParseIntPipe) username: string) {
		const user = await this.userService.getUser({ username });

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return {
			status: 'success',
			user,
		};
	}

	@UseInterceptors(FileInterceptor('file'))
	@Post('/avatar')
	async uploadAvatar(
		@UploadedFile() { destination, filename }: Express.Multer.File,
		@Headers('host') host: string,
		@Request() req: ReqUserDto,
	) {
		const avatar = File.getLink({ host, destination, filename });
		const updatedUser = await this.userService.updateUser(req.user.id, { avatar });

		return Formatted.sanitizeUser(updatedUser);
	}

	@Post('/')
	async createUser(@Body() dto: UserCreateDto) {
		const user = await this.userService.createUser({
			...dto,
			passwordChangedAt: new Date(Date.now() - 1000),
		});

		return Formatted.sanitizeUser(user);

		// return { status: 'success', user: sanitizeUser(user) };
	}

	@Patch('/')
	async updateUser(@Request() req: ReqUserDto, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.userService.updateUser(req.user.id, dto);
		return Formatted.sanitizeUser(updatedUser);
	}

	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		const deletedUser = await this.userService.deleteUser(id);
		return { status: 'success', data: deletedUser };
	}
}
