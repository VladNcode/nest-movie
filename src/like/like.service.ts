import { Injectable } from '@nestjs/common';
import { LikeType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LikeService {
	constructor(private readonly prisma: PrismaService) {}

	async createLike(likeType: LikeType, typeId: number, userId: number) {
		return this.prisma.like.create({
			data: {
				likeType,
				typeId,
				userId,
			},
		});
	}

	async deleteLike(type: LikeType, id: number, userId: number) {
		return this.prisma.like.delete({
			where: { userId_likeType_typeId: { likeType: type, typeId: id, userId: userId } },
		});
	}
}
