import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getUser(data: Prisma.UserWhereUniqueInput): Promise<User | null> {
		return this.prisma.user.findUnique({ where: { ...data } });
	}

	async getUsers(params: Prisma.UserFindManyArgs): Promise<User[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.user.findMany({ skip, take, cursor, where, orderBy });
	}

	async getUserByToken(token: string) {
		console.log('date:', new Date(Date.now()));

		return this.prisma.user.findFirst({
			where: {
				AND: [
					{ passwordResetToken: token },
					{
						passwordResetExpires: {
							gte: new Date(Date.now()),
						},
					},
				],
			},
		});
	}

	async createUser(data: Prisma.UserCreateInput): Promise<User> {
		return await this.prisma.user.create({ data });
	}

	async updateUser(data: { body: Prisma.UserUpdateInput; id: User['id'] }): Promise<User> {
		const { id, body } = data;
		return this.prisma.user.update({ where: { id }, data: body });
	}

	async updateUserEmail(data: { oldEmail: User['email']; newEmail: string }): Promise<User> {
		const { oldEmail, newEmail } = data;
		return this.prisma.user.update({ where: { email: oldEmail }, data: { email: newEmail } });
	}

	async updateUserPassword(data: { email: User['email']; password: string }): Promise<User> {
		const { email, password } = data;
		return this.prisma.user.update({
			where: { email },
			data: {
				passwordHash: password,
				passwordChangedAt: new Date(Date.now() - 1000),
				passwordResetToken: null,
				passwordResetExpires: null,
			},
		});
	}

	async deleteUser(id: User['id']): Promise<User> {
		return this.prisma.user.delete({ where: { id } });
	}

	async deleteUserByEmail(email: User['email']): Promise<User> {
		return this.prisma.user.delete({ where: { email } });
	}
}
