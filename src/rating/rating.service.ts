import { Injectable } from '@nestjs/common';
import { Prisma, Rating, RatingType } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RatingService {
	constructor(private readonly prisma: PrismaService) {}

	async getRating(data: Prisma.RatingUserIdRatingTypeTypeIdCompoundUniqueInput): Promise<Rating | null> {
		const { ratingType, typeId, userId } = data;

		return this.prisma.rating.findUnique({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
		});
	}

	async createRating(data: Prisma.RatingUncheckedCreateInput): Promise<Rating> {
		const { ratingType, typeId, userId, score } = data;

		return this.prisma.rating.create({
			data: { score, ratingType, typeId, userId },
		});
	}

	async updateRating(
		data: Prisma.RatingUserIdRatingTypeTypeIdCompoundUniqueInput & { score: number },
	): Promise<Rating> {
		const { ratingType, typeId, userId, score } = data;

		return this.prisma.rating.update({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
			data: { score },
		});
	}

	async deleteRating(data: Prisma.RatingUserIdRatingTypeTypeIdCompoundUniqueInput): Promise<Rating> {
		const { ratingType, typeId, userId } = data;

		return this.prisma.rating.delete({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
		});
	}

	async findRatingAverage(data: { type: RatingType; id: number }): Promise<number | null> {
		const { type, id } = data;
		const avg = await this.prisma.rating.aggregate({
			_avg: {
				score: true,
			},
			where: {
				AND: [{ ratingType: type }, { typeId: id }],
			},
		});

		return avg._avg.score;
	}
}
