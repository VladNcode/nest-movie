import { Injectable } from '@nestjs/common';
import { Prisma, Review } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReviewService {
	constructor(private readonly prisma: PrismaService) {}

	async getReview(id: Review['id']): Promise<Review | null> {
		return this.prisma.review.findUnique({ where: { id } });
	}

	async getReviews(params: Prisma.ReviewFindManyArgs): Promise<Review[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.review.findMany({ skip, take, cursor, where, orderBy });
	}

	async createReview(data: Prisma.ReviewUncheckedCreateInput): Promise<Review> {
		const { userId, movieId, body } = data;

		return this.prisma.review.create({
			data: { body, movieId, userId },
		});
	}

	async updateReview(data: { id: Review['id']; body: Prisma.ReviewUpdateInput['body'] }): Promise<Review> {
		const { id, body } = data;
		return this.prisma.review.update({ where: { id }, data: { body } });
	}

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete: likes, ratings and comments which are related to the review
	 * @param id - the review id
	 * @returns deleted review
	 */
	async deleteReview(id: Review['id']): Promise<Review> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'review' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'review' }, { typeId: id }] },
		});

		const deleteComments = this.prisma.comment.deleteMany({
			where: { AND: [{ commentType: 'review' }, { typeId: id }] },
		});

		const deletedReview = this.prisma.review.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedRatings, deleteComments, deletedReview]);

		return deletedReview;
	}
}
