import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Param,
	ParseIntPipe,
	Patch,
	Query,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
	Post,
	Delete,
} from '@nestjs/common';
import { CommentResponse } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards';
import {
	COMMENT_DELETED_SUCCESFULLY,
	COMMENT_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER,
} from '../comment/comment.constants';
import { CommentResponseService } from './comment-response.service';

import { CreateCommentResponseDto, GetCommentResponseDto, UpdateCommentResponseDto } from 'src/exports/dto';

import { ReqUser } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('commentResponse')
export class CommentResponseController {
	constructor(private readonly commentResponseService: CommentResponseService) {}

	@Get('/:id')
	async getCommentResponse(@Param('id', ParseIntPipe) id: number): Promise<{
		status: string;
		comment: CommentResponse;
	}> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return { status: 'success', comment };
	}

	@Get('/')
	async getCommentResponses(@Query() query: GetCommentResponseDto): Promise<{
		status: string;
		data: { results: number; comments: CommentResponse[] };
	}> {
		const { skip, take, userId, commentId, id, order } = query;

		const comments = await this.commentResponseService.getCommentResponses({
			skip: skip || 0,
			take: take || 100,
			where: { userId, commentId, id },
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

	@Post('/')
	async createCommentResponse(
		@Request() req: ReqUser,
		@Body() { commentId, body }: CreateCommentResponseDto,
	): Promise<{ status: string; comment: CommentResponse }> {
		const comment = await this.commentResponseService.createCommentResponse({
			commentId,
			body,
			userId: req.user.id,
		});
		return { status: 'success', comment };
	}

	@Patch('/:id')
	async updateCommentResponse(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateCommentResponseDto,
	): Promise<{ status: string; comment?: CommentResponse; message?: string }> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			const updatedComment = await this.commentResponseService.updateCommentResponse({ id, body });
			return { status: 'success', comment: updatedComment };
		}

		return { status: 'failure', message: THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER };
	}

	@Delete('/:id')
	async deleteCommentResponse(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<{ status: string; message: string }> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			await this.commentResponseService.deleteCommentResponse(id);
			return { status: 'success', message: COMMENT_DELETED_SUCCESFULLY };
		}

		return { status: 'success', message: THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER };
	}
}
