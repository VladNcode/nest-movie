import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LikeOrRatingType } from './types/like-or-rating.type';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	async onModuleInit() {
		await this.$connect();
	}

	async enableShutdownHooks(app: INestApplication) {
		this.$on('beforeExit', async () => {
			await app.close();
		});
	}

	async checkIfRecordExists(type: LikeOrRatingType, id: number) {
		const models = {
			movie: await this.movie.findUnique({ where: { id } }),
			actor: await this.actor.findUnique({ where: { id } }),
			review: await this.review.findUnique({ where: { id } }),
			comment: await this.comment.findUnique({ where: { id } }),
			comment4Comment: await this.comment4Comment.findUnique({ where: { id } }),
		};

		if (!models[type]) {
			return false;
		}

		return true;
	}
}
