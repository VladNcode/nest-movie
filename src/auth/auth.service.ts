import { genSalt, hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

	async login(email: string) {
		const payload = { email };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	async signup(dto: RegisterDto) {
		const { username, email, bio, avatar } = dto;

		const salt = await genSalt(12);
		const passwordHash = await hash(dto.password, salt);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { passwordHash: ph, ...userWithoutPassword } = await this.userService.createUser({
			username,
			email,
			passwordHash,
			bio,
			avatar,
		});

		return userWithoutPassword;
	}
}
