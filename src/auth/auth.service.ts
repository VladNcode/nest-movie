/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { hashPassword } from '../helpers/hashPassword';
import { sanitizeUser } from '../helpers/sanitize.user';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

	async login(email: string) {
		const user = await this.userService.getUser({ email });
		const payload = { email: user?.email, id: user?.id, role: user?.role };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signup(dto: RegisterDto) {
		const { username, email, bio, avatar } = dto;

		const passwordHash = await hashPassword(dto.password);

		const user = await this.userService.createUser({
			username,
			email,
			passwordHash,
			bio,
			avatar,
			passwordChangedAt: new Date(Date.now() - 1000),
		});

		return sanitizeUser(user);
	}
}
