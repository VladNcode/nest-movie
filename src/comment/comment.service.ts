import { Injectable } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateCommentDto } from './dto/create-or-update-comment.dto';
import { GetComments } from './interfaces/get-comments.interface';

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async getComment(id: number): Promise<Comment | null> {
		return this.prisma.comment.findUnique({
			where: { id },
			include: {
				CommentResponse: {
					select: {
						userId: true,
						body: true,
					},
				},
			},
		});
	}

	async getComments(params: GetComments): Promise<Comment[]> {
		const { skip, take, cursor, where, orderBy } = params;

		return this.prisma.comment.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			include: {
				CommentResponse: {
					select: {
						userId: true,
						body: true,
					},
				},
			},
		});
	}

	async createComment(data: CreateOrUpdateCommentDto): Promise<Comment> {
		const { commentType, typeId, userId, body } = data;

		return this.prisma.comment.create({
			data: { body, commentType, typeId, userId },
		});
	}
	async updateComment(id: number, body: string): Promise<Comment> {
		return this.prisma.comment.update({ where: { id }, data: { body } });
	}

	async deleteComment(id: number): Promise<Comment> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'comment' }, { typeId: id }] },
		});

		const deletedComment = this.prisma.comment.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedComment]);

		return deletedComment;
	}
}
