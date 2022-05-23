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
	UsePipes,
	ValidationPipe,
	Request,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { FileService, Formatted } from '../helpers/';
import { USER_NOT_FOUND, USER_SUCCESSFULLY_DELETED } from './user.constants';
import { UserService } from './user.service';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { Auth } from '../decorators/apply.decorator';
import { deleteUser, getMe, getUser, getUsers, updateUser, uploadAvatar } from '../swagger/user/user.decorators';

import { FindUserDto, UpdateUserDto } from 'src/exports/dto';
import {
	ReqUser,
	ReturnDeletedMessage,
	ReturnManyRecords,
	ReturnSanitizedUser,
	SanitizedUser,
} from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Users')
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService, private readonly fileService: FileService) {}

	@SwaggerDecorator(getUsers)
	@Get('/')
	async getUsers(@Query() query: FindUserDto): Promise<ReturnManyRecords<'users', SanitizedUser[]>> {
		const { skip, take, username, email, id, order } = query;

		const users = await this.userService.getUsers({
			skip: skip || 0,
			take: take || 100,
			where: { id, username, email },
			orderBy: { id: order },
		});

		const formattedUsers = users.map(({ id, createdAt, updatedAt, username, email, bio, avatar, role }) => ({
			id,
			createdAt,
			updatedAt,
			username,
			email,
			bio,
			avatar,
			role,
		}));

		return Formatted.response({ results: users.length, users: formattedUsers });
	}

	@SwaggerDecorator(getMe)
	@Get('/me')
	async getMe(@Request() req: ReqUser): Promise<ReturnSanitizedUser> {
		const user = await this.userService.getUser({ id: req.user.id });

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return Formatted.sanitizeUser(user);
	}

	@SwaggerDecorator(getUser)
	@Get('/:id')
	async getUser(@Param('id', ParseIntPipe) id: number): Promise<ReturnSanitizedUser> {
		const user = await this.userService.getUser({ id });

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return Formatted.sanitizeUser(user);
	}

	@SwaggerDecorator(uploadAvatar)
	@UseInterceptors(FileInterceptor('file'))
	@Post('/avatar')
	async uploadAvatar(
		@UploadedFile() { destination, filename }: Express.Multer.File,
		@Request() req: ReqUser,
	): Promise<ReturnSanitizedUser> {
		const avatar = this.fileService.getLink({ destination, filename });
		const updatedUser = await this.userService.updateUser({ id: req.user.id, body: { avatar } });

		return Formatted.sanitizeUser(updatedUser);
	}

	@SwaggerDecorator(updateUser)
	@Patch('/updateme')
	async updateUser(@Request() req: ReqUser, @Body() dto: UpdateUserDto): Promise<ReturnSanitizedUser> {
		const updatedUser = await this.userService.updateUser({ id: req.user.id, body: dto });

		return Formatted.sanitizeUser(updatedUser);
	}

	@SwaggerDecorator(deleteUser)
	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage<'message', string>> {
		await this.userService.deleteUser(id);

		return Formatted.response({ message: USER_SUCCESSFULLY_DELETED });
	}
}
