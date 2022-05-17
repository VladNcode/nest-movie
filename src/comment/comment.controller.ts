import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Post,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
	Patch,
	Delete,
} from '@nestjs/common';
import { Comment } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import {
	COMMENT_DELETED_SUCCESFULLY,
	COMMENT_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER,
} from './comment.constants';
import { CommentService } from './comment.service';

import { ReqUserDto, CreateOrUpdateCommentDto, GetCommentsDto, UpdateCommentDto } from 'src/exports/dto';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService, private readonly prisma: PrismaService) {}

	@Get('/')
	async getComments(@Query() query: GetCommentsDto): Promise<{
		status: string;
		data: { results: number; comments: Comment[] };
	}> {
		const { skip, take, commentType, typeId, userId, id, order } = query;

		const comments = await this.commentService.getComments({
			skip: skip || 0,
			take: take || 100,
			where: { id, commentType, typeId, userId },
			orderBy: { id: order },
		});

		return {
			status: 'success',
			data: {
				results: comments.length,
				comments,
			},
		};
	}

	@Get('/:id')
	async getComment(@Param('id', ParseIntPipe) id: number): Promise<{
		status: string;
		comment: Comment;
	}> {
		const comment = await this.commentService.getComment(id);
		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return { status: 'success', comment };
	}

	@Post('/')
	async createComment(
		@Request() req: ReqUserDto,
		@Body() { commentType, typeId, body }: CreateOrUpdateCommentDto,
	): Promise<{ status: string; data: Comment }> {
		const record = await this.prisma.checkIfRecordExists(commentType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(commentType));
		}

		const comment = await this.commentService.createComment({
			commentType,
			typeId,
			body,
			userId: req.user.id,
		});
		return { status: 'success', data: comment };
	}

	@Patch('/:id')
	async updateComment(
		@Request() req: ReqUserDto,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateCommentDto,
	): Promise<{ status: string; review?: Comment; message?: string }> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			const updatedComment = await this.commentService.updateComment(id, body);
			return { status: 'success', review: updatedComment };
		}

		return { status: 'failure', message: THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER };
	}

	@Delete('/:id')
	async deleteComment(
		@Request() req: ReqUserDto,
		@Param('id', ParseIntPipe) id: number,
	): Promise<{ status: string; message: string }> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			await this.commentService.deleteComment(id);
			return { status: 'success', message: COMMENT_DELETED_SUCCESFULLY };
		}

		return { status: 'success', message: THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER };
	}
}
