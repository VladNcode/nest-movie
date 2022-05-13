import { Injectable } from '@nestjs/common';
import { Review } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewCreateDto } from './dto/create-review.dto';
import { GetReviews } from './interfaces/get-reviews.interface';

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async getReview(id: number): Promise<Review | null> {
		return this.prisma.review.findUnique({ where: { id } });
	}

	async getReviews(params: GetReviews): Promise<Review[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.review.findMany({ skip, take, cursor, where, orderBy });
	}

	async createReview(data: ReviewCreateDto): Promise<Review> {
		const { userId, movieId, body } = data;

		return this.prisma.review.create({
			data: { body, movieId, userId },
		});
	}

	async updateReview(id: number, body: string): Promise<Review> {
		return this.prisma.review.update({ where: { id }, data: { body } });
	}

	async deleteReview(id: number): Promise<Review> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'review' }, { typeId: id }] },
		});

		const deleteComments = this.prisma.comment.deleteMany({
			where: { AND: [{ commentType: 'review' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'review' }, { typeId: id }] },
		});

		const deletedReview = this.prisma.review.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deleteComments, deletedRatings, deletedReview]);

		return deletedReview;
	}
}
