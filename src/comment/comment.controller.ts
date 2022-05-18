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
	UnauthorizedException,
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
import { Formatted } from '../helpers';

import { CreateOrUpdateCommentDto, GetCommentsDto, UpdateCommentDto } from 'src/exports/dto';
import { ReqUser, ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService, private readonly prisma: PrismaService) {}

	@Get('/')
	async getComments(@Query() query: GetCommentsDto): Promise<ReturnManyRecords<'comments', Comment[]>> {
		const { skip, take, commentType, typeId, userId, id, order } = query;

		const comments = await this.commentService.getComments({
			skip: skip || 0,
			take: take || 100,
			where: { id, commentType, typeId, userId },
			orderBy: { id: order },
		});

		return Formatted.response({ results: comments.length, comments });
	}

	@Get('/:id')
	async getComment(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'comment', Comment>> {
		const comment = await this.commentService.getComment(id);
		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return Formatted.response({ comment });
	}

	@Post('/')
	async createComment(
		@Request() req: ReqUser,
		@Body() { commentType, typeId, body }: CreateOrUpdateCommentDto,
	): Promise<ReturnSingleRecord<'comment', Comment>> {
		const record = await this.prisma.checkIfRecordExists({ type: commentType, id: typeId });

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(commentType));
		}

		const comment = await this.commentService.createComment({
			commentType,
			typeId,
			body,
			userId: req.user.id,
		});

		return Formatted.response({ comment });
	}

	@Patch('/:id')
	async updateComment(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateCommentDto,
	): Promise<ReturnSingleRecord<'comment', Comment>> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId !== req.user.id) {
			throw new UnauthorizedException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		const updatedComment = await this.commentService.updateComment({ id, body });

		return Formatted.response({ comment: updatedComment });
	}

	@Delete('/:id')
	async deleteComment(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<ReturnDeletedMessage<'message', string>> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId !== req.user.id) {
			throw new UnauthorizedException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		await this.commentService.deleteComment(id);

		return Formatted.response({ message: COMMENT_DELETED_SUCCESFULLY });
	}
}
