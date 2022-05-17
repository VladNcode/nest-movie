import { Injectable } from '@nestjs/common';
import { Like, LikeType } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { createFindUpdateLike } from 'src/exports/dto';

@Injectable()
export class LikeService {
	constructor(private readonly prisma: PrismaService) {}

	async findLike(data: createFindUpdateLike): Promise<Like | null> {
		const { likeType, typeId, userId } = data;
		return this.prisma.like.findUnique({
			where: { userId_likeType_typeId: { likeType, typeId, userId } },
		});
	}

	async countLikes(type: LikeType, id: number): Promise<number> {
		const count = await this.prisma.like.aggregate({
			_count: true,
			where: {
				AND: [{ likeType: type }, { typeId: id }],
			},
		});

		return count._count;
	}

	async createLike(data: createFindUpdateLike): Promise<Like> {
		const { likeType, typeId, userId } = data;

		return this.prisma.like.create({
			data: {
				likeType,
				typeId,
				userId,
			},
		});
	}

	async deleteLike(data: createFindUpdateLike): Promise<Like> {
		const { likeType, typeId, userId } = data;

		return this.prisma.like.delete({
			where: { userId_likeType_typeId: { likeType, typeId, userId } },
		});
	}
}
