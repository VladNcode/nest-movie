import { Injectable } from '@nestjs/common';
import { Rating } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateRatingDto } from './dto/create-or-update-rating.dto';
import { DeleteRatingDto } from './dto/delete-rating.dto';

@Injectable()
export class RatingService {
	constructor(private readonly prisma: PrismaService) {}

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

	async deleteRating(data: DeleteRatingDto): Promise<Rating> {
		const { ratingType, typeId, userId } = data;

		return this.prisma.rating.delete({
			where: { userId_ratingType_typeId: { ratingType, typeId, userId } },
		});
	}
}
