import { Body, Controller, Post } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('create')
	async createUser(@Body() dto: UserCreateDto) {
		const user = await this.userService.createUser(dto);
		return { status: 'success', data: user };
	}
}
