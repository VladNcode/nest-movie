import { Injectable } from '@nestjs/common';
import { Like, LikeType, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
	constructor(private readonly prisma: PrismaService) {}

	async findLike(data: Prisma.LikeUserIdLikeTypeTypeIdCompoundUniqueInput): Promise<Like | null> {
		const { likeType, typeId, userId } = data;
		return this.prisma.like.findUnique({
			where: { userId_likeType_typeId: { likeType, typeId, userId } },
		});
	}

	async countLikes(data: { type: LikeType; id: number }): Promise<number> {
		const { type, id } = data;
		const count = await this.prisma.like.aggregate({
			_count: true,
			where: {
				AND: [{ likeType: type }, { typeId: id }],
			},
		});

		return count._count;
	}

	async createLike(data: Prisma.LikeUncheckedCreateInput): Promise<Like> {
		const { likeType, typeId, userId } = data;

		return this.prisma.like.create({
			data: {
				likeType,
				typeId,
				userId,
			},
		});
	}

	async deleteLike(data: Prisma.LikeUserIdLikeTypeTypeIdCompoundUniqueInput): Promise<Like> {
		const { likeType, typeId, userId } = data;

		return this.prisma.like.delete({
			where: { userId_likeType_typeId: { likeType, typeId, userId } },
		});
	}
}
