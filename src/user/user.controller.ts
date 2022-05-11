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
} from '@nestjs/common';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { sanitizeUser } from '../helpers/sanitize.user';
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

	@Post('/')
	async createUser(@Body() dto: UserCreateDto) {
		const user = await this.userService.createUser({
			...dto,
			passwordChangedAt: new Date(Date.now() - 1000),
		});

		return { status: 'success', user: sanitizeUser(user) };
	}

	@Patch('/')
	async updateUser(@Request() req: ReqUserDto, @Body() dto: UpdateUserDto) {
		const updatedUser = await this.userService.updateUser(req.user.id, dto);
		return { status: 'success', data: sanitizeUser(updatedUser) };
	}

	@Delete('/:id')
	async deleteUser(@Param('id', ParseIntPipe) id: number) {
		const deletedUser = await this.userService.deleteUser(id);
		return { status: 'success', data: deletedUser };
	}
}
