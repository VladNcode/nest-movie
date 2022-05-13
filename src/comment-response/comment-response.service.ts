import { Injectable } from '@nestjs/common';
import { CommentResponse } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentResponse } from './interfaces/create-comment-response.interface';
import { GetCommentResponse } from './interfaces/get-comment-response.intefrace';
import { UpdateCommentResponse } from './interfaces/update-comment-response.interface';

@Injectable()
export class CommentResponseService {
	constructor(private readonly prisma: PrismaService) {}

	async getCommentResponse(id: number): Promise<CommentResponse | null> {
		return this.prisma.commentResponse.findUnique({ where: { id } });
	}

	async getCommentResponses(params: GetCommentResponse): Promise<CommentResponse[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.commentResponse.findMany({ skip, take, cursor, where, orderBy });
	}

	async createCommentResponse({
		userId,
		commentId,
		body,
	}: CreateCommentResponse): Promise<CommentResponse> {
		return this.prisma.commentResponse.create({ data: { userId, commentId, body } });
	}

	async updateCommentResponse({ id, body }: UpdateCommentResponse): Promise<CommentResponse> {
		return this.prisma.commentResponse.update({ where: { id }, data: { body } });
	}

	async deleteCommentResponse(id: number): Promise<CommentResponse> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'commentResponse' }, { typeId: id }] },
		});

		const deletedCommentResponse = this.prisma.commentResponse.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedCommentResponse]);

		return deletedCommentResponse;
	}
}
