import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async findUser(username: string) {
		return this.prisma.user.findUnique({ where: { username } });
	}

	async createUser(data: UserCreateDto) {
		return this.prisma.user.create({ data });
	}

	async validateUser(username: string, password: string) {
		const userExists = await this.findUser(username);
		if (!userExists) {
			throw new UnauthorizedException('User not found!');
		}

		const isCorrectPassword = await compare(password, userExists.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException('email or password is incorrect!');
		}

		return {
			email: userExists.email,
		};
	}
}
