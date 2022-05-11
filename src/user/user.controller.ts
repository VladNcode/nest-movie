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
} from '@nestjs/common';
import { UserCreateDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_NOT_FOUND } from './user.constants';
import { UserService } from './user.service';

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

	@Post('/')
	async createUser(@Body() dto: UserCreateDto) {
		const user = await this.userService.createUser({
			...dto,
			passwordChangedAt: new Date(Date.now() - 1000),
		});

		return { status: 'success', user };
	}

	@Patch('/:id')
	async updateUser(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.userService.updateUser(id, dto);
		return { status: 'success', data: updatedUser };
	}

	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		const deletedUser = await this.userService.deleteUser(id);
		return { status: 'success', data: deletedUser };
	}
}
