import { compare } from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto } from './dto/create-user.dto';
import { GetUsers } from './interfaces/get-users.interface';
import { Prisma, User } from '@prisma/client';
import { USER_NOT_FOUND, EMAIL_OR_PASSWORD_IS_INCORRECT } from './user.constants';
import { IGetUser } from './interfaces/get-user.interface';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(data: IGetUser) {
		return this.prisma.user.findUnique({ where: { ...data } });
	}

	async getUsers(params: GetUsers) {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
	}

	async createUser(data: UserCreateDto) {
		return this.prisma.user.create({ data });
	}

	async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
		return this.prisma.user.update({ where: { id }, data });
	}

	async updateUserEmail(oldEmail: string, newEmail: string): Promise<User> {
		return this.prisma.user.update({ where: { email: oldEmail }, data: { email: newEmail } });
	}

	async updateUserPassword(email: string, password: string): Promise<User> {
		return this.prisma.user.update({
			where: { email },
			data: { passwordHash: password, passwordChangedAt: new Date(Date.now() - 1000) },
		});
	}

	async deleteUser(id: number): Promise<User> {
		return this.prisma.user.delete({ where: { id } });
	}

	async deleteUserByEmail(email: string): Promise<User> {
		return this.prisma.user.delete({ where: { email } });
	}

	async validateUser(username: string, password: string) {
		const userExists = await this.getUser({ username });
		if (!userExists) {
			throw new UnauthorizedException(USER_NOT_FOUND);
		}

		const isCorrectPassword = await compare(password, userExists.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException(EMAIL_OR_PASSWORD_IS_INCORRECT);
		}

		return {
			email: userExists.email,
		};
	}
}
