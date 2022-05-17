import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from '../user/user.service';
import { hashPassword } from '../helpers';

import { RegisterDto } from 'src/exports/dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

	async login(email: User['email']): Promise<{ access_token: string }> {
		const user = await this.userService.getUser({ email });
		const payload = { email: user?.email, id: user?.id, role: user?.role };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signup(dto: RegisterDto): Promise<User> {
		const { username, email, bio } = dto;
		const passwordHash = await hashPassword(dto.password);

		return this.userService.createUser({
			username,
			email,
			passwordHash,
			bio,
			passwordChangedAt: new Date(Date.now() - 1000),
		});
	}
}
