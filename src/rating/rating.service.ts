import { Injectable } from '@nestjs/common';
import { Rating, RatingType } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateRatingDto } from './dto/create-or-update-rating.dto';
import { GetOrDeleteRatingDto } from './dto/delete-rating.dto';

@Injectable()
export class RatingService {
	constructor(private readonly prisma: PrismaService) {}

	async getRating(data: GetOrDeleteRatingDto): Promise<Rating | null> {
		const { ratingType, typeId, userId } = data;

		return this.prisma.rating.findUnique({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
		});
	}

	async createRating(data: CreateOrUpdateRatingDto): Promise<Rating> {
		const { ratingType, typeId, userId, score } = data;

		return this.prisma.rating.create({
			data: { score, ratingType, typeId, userId },
		});
	}

	async updateRating(data: CreateOrUpdateRatingDto): Promise<Rating> {
		const { ratingType, typeId, userId, score } = data;

		return this.prisma.rating.update({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
			data: { score },
		});
	}

	async deleteRating(data: GetOrDeleteRatingDto): Promise<Rating> {
		const { ratingType, typeId, userId } = data;

		return this.prisma.rating.delete({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
		});
	}

	async findRatingAverage(type: RatingType, id: number): Promise<number | null> {
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
