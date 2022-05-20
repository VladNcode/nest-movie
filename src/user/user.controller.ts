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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '../auth/guards/';
import { FileService, Formatted } from '../helpers/';
import { USER_NOT_FOUND, USER_SUCCESSFULLY_DELETED } from './user.constants';
import { UserService } from './user.service';

import { UserCreateDto, FindUserDto, UpdateUserDto } from 'src/exports/dto';
import {
	ReqUser,
	ReturnDeletedMessage,
	ReturnManyRecords,
	ReturnSanitizedUser,
	ReturnSingleRecord,
} from 'src/exports/interfaces';
import { User } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@UsePipes(new ValidationPipe({ transform: true }))
@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService, private readonly fileService: FileService) {}

	@Get('/')
	async getUsers(@Query() query: FindUserDto): Promise<ReturnManyRecords<'users', User[]>> {
		const { skip, take, username, email, id, order } = query;

		const users = await this.userService.getUsers({
			skip: skip || 0,
			take: take || 100,
			where: { id, username, email },
			orderBy: { id: order },
		});

		return Formatted.response({ results: users.length, users });
	}

	//TODO fix username
	@Get('/:id')
	async getUser(@Param('id', ParseIntPipe) username: string): Promise<ReturnSingleRecord<'user', User>> {
		const user = await this.userService.getUser({ username });

		if (!user) {
			throw new NotFoundException(USER_NOT_FOUND);
		}

		return Formatted.response({ user });
	}

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

	@Post('/')
	async createUser(@Body() dto: UserCreateDto): Promise<ReturnSanitizedUser> {
		const user = await this.userService.createUser({
			...dto,
			passwordChangedAt: new Date(Date.now() - 1000),
		});

		return Formatted.sanitizeUser(user);
	}

	@Patch('/')
	async updateUser(@Request() req: ReqUser, @Body() dto: UpdateUserDto): Promise<ReturnSanitizedUser> {
		const updatedUser = await this.userService.updateUser({ id: req.user.id, body: dto });
		return Formatted.sanitizeUser(updatedUser);
	}

	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage<'message', string>> {
		await this.userService.deleteUser(id);
		return Formatted.response({ message: USER_SUCCESSFULLY_DELETED });
	}
}
