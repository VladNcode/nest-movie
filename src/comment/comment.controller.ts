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

import { JwtAuthGuard } from '../auth/guards/';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import {
	COMMENT_DELETED_SUCCESFULLY,
	COMMENT_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER,
} from './comment.constants';
import { CommentService } from './comment.service';

import { CreateOrUpdateCommentDto, GetCommentsDto, UpdateCommentDto } from 'src/exports/dto';
import { ReqUser, ReturnComment, ReturnComments, ReturnDeletedMessage } from 'src/exports/interfaces';
import { Formatted } from '../helpers';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentController {
	constructor(private readonly commentService: CommentService, private readonly prisma: PrismaService) {}

	@Get('/')
	async getComments(@Query() query: GetCommentsDto): Promise<ReturnComments> {
		const { skip, take, commentType, typeId, userId, id, order } = query;

		const comments = await this.commentService.getComments({
			skip: skip || 0,
			take: take || 100,
			where: { id, commentType, typeId, userId },
			orderBy: { id: order },
		});

		return { status: 'success', data: { results: comments.length, comments } };
	}

	@Get('/:id')
	async getComment(@Param('id', ParseIntPipe) id: number): Promise<ReturnComment> {
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
	): Promise<ReturnComment> {
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

		return Formatted.response({ comment });
	}

	@Patch('/:id')
	async updateComment(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateCommentDto,
	): Promise<ReturnComment> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			const updatedComment = await this.commentService.updateComment({ id, body });
			return Formatted.response({ comment: updatedComment });
		}

		throw new UnauthorizedException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
	}

	@Delete('/:id')
	async deleteComment(@Request() req: ReqUser, @Param('id', ParseIntPipe) id: number): Promise<ReturnDeletedMessage> {
		const comment = await this.commentService.getComment(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId === req.user.id) {
			await this.commentService.deleteComment(id);
			return { status: 'success', message: COMMENT_DELETED_SUCCESFULLY };
		}

		throw new UnauthorizedException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
	}
}
