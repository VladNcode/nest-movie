import { Injectable } from '@nestjs/common';
import { Comment, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async getComment(id: Comment['id']): Promise<Comment | null> {
		return this.prisma.comment.findUnique({
			where: { id },
			include: {
				commentResponses: {
					select: {
						userId: true,
						body: true,
					},
				},
			},
		});
	}

	async getComments(params: Prisma.CommentFindManyArgs): Promise<Comment[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.comment.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			include: {
				commentResponses: {
					select: {
						userId: true,
						body: true,
					},
				},
			},
		});
	}

	async createComment(data: Prisma.CommentUncheckedCreateInput): Promise<Comment> {
		const { commentType, typeId, userId, body } = data;

		return this.prisma.comment.create({
			data: { body, commentType, typeId, userId },
		});
	}
	async updateComment(data: { body: Prisma.CommentUpdateInput['body']; id: Comment['id'] }): Promise<Comment> {
		const { id, body } = data;
		return this.prisma.comment.update({ where: { id }, data: { body } });
	}

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete likes which are related to the comment
	 * @param id - the comment id
	 * @returns deleted comment
	 */
	async deleteComment(id: Comment['id']): Promise<Comment> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'comment' }, { typeId: id }] },
		});

		const deletedComment = this.prisma.comment.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedComment]);

		return deletedComment;
	}
}
