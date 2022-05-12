import { Injectable } from '@nestjs/common';
import { Like, LikeType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
	constructor(private readonly prisma: PrismaService) {}

	async createLike(likeType: LikeType, typeId: number, userId: number): Promise<Like> {
		return this.prisma.like.create({
			data: {
				likeType,
				typeId,
				userId,
			},
		});
	}

	async deleteLike(likeType: LikeType, typeId: number, userId: number): Promise<Like> {
		return this.prisma.like.delete({
			where: { userId_likeType_typeId: { likeType, typeId, userId } },
		});
	}
}
