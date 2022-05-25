import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LikeRatingCommentType } from './types/like-or-rating.type';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit(): Promise<void> {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication): Promise<void> {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}

	async checkIfRecordExists(data: { type: LikeRatingCommentType; id: number }): Promise<boolean> {
		const { type, id } = data;
		const models = {
			movie: await this.movie.findUnique({ where: { id } }),
			actor: await this.actor.findUnique({ where: { id } }),
			review: await this.review.findUnique({ where: { id } }),
			comment: await this.comment.findUnique({ where: { id } }),
			commentResponse: await this.commentResponse.findUnique({ where: { id } }),
		};

		if (!models[type]) {
			return false;
		}

		return true;
	}
}
