import { Injectable } from '@nestjs/common';
import { CommentResponse, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentResponseService {
	constructor(private readonly prisma: PrismaService) {}

	async getCommentResponse(id: CommentResponse['id']): Promise<CommentResponse | null> {
		return this.prisma.commentResponse.findUnique({ where: { id } });
	}

	async getCommentResponses(params: Prisma.CommentResponseFindManyArgs): Promise<CommentResponse[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.commentResponse.findMany({ skip, take, cursor, where, orderBy });
	}

	async createCommentResponse(data: Prisma.CommentResponseUncheckedCreateInput): Promise<CommentResponse> {
		const { userId, commentId, body } = data;
		return this.prisma.commentResponse.create({ data: { userId, commentId, body } });
	}

	async updateCommentResponse(data: {
		body: Prisma.CommentResponseUpdateInput['body'];
		id: CommentResponse['id'];
	}): Promise<CommentResponse> {
		const { id, body } = data;
		return this.prisma.commentResponse.update({ where: { id }, data: { body } });
	}

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete likes which are related to the commentResponse
	 * @param id - the commentResponse id
	 * @returns deleted commentResponse
	 */
	async deleteCommentResponse(id: CommentResponse['id']): Promise<CommentResponse> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'commentResponse' }, { typeId: id }] },
		});

		const deletedCommentResponse = this.prisma.commentResponse.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedCommentResponse]);

		return deletedCommentResponse;
	}
}
