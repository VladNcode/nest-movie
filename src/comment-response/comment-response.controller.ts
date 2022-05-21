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
	ForbiddenException,
} from '@nestjs/common';
import { CommentResponse } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';
import {
	COMMENT_DELETED_SUCCESFULLY,
	COMMENT_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER,
} from '../comment/comment.constants';
import { CommentResponseService } from './comment-response.service';
import { Formatted } from '../helpers';

import { CreateCommentResponseDto, GetCommentResponseDto, UpdateCommentResponseDto } from 'src/exports/dto';
import { ReqUser, ReturnDeletedMessage, ReturnManyRecords, ReturnSingleRecord } from 'src/exports/interfaces';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import {
	createCommentResponse,
	deleteCommentResponse,
	getCommentResponse,
	getCommentResponses,
	updateCommentResponse,
} from '../swagger/comment-response/comment-response.decorators';

@ApiTags('Comment Responses')
@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('commentResponse')
export class CommentResponseController {
	constructor(private readonly commentResponseService: CommentResponseService) {}

	@SwaggerDecorator(getCommentResponses)
	@Get('/')
	async getCommentResponses(
		@Query() query: GetCommentResponseDto,
	): Promise<ReturnManyRecords<'comments', CommentResponse[]>> {
		const { skip, take, userId, commentId, id, order } = query;

		const comments = await this.commentResponseService.getCommentResponses({
			skip: skip || 0,
			take: take || 100,
			where: { userId, commentId, id },
			orderBy: { id: order },
		});

		return Formatted.response({ results: comments.length, comments });
	}

	@SwaggerDecorator(getCommentResponse)
	@Get('/:id')
	async getCommentResponse(
		@Param('id', ParseIntPipe) id: number,
	): Promise<ReturnSingleRecord<'comment', CommentResponse>> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return Formatted.response({ comment });
	}

	@SwaggerDecorator(createCommentResponse)
	@Post('/')
	async createCommentResponse(
		@Request() req: ReqUser,
		@Body() { commentId, body }: CreateCommentResponseDto,
	): Promise<ReturnSingleRecord<'comment', CommentResponse>> {
		const comment = await this.commentResponseService.createCommentResponse({
			commentId,
			body,
			userId: req.user.id,
		});

		return Formatted.response({ comment });
	}

	@SwaggerDecorator(updateCommentResponse)
	@Patch('/:id')
	async updateCommentResponse(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateCommentResponseDto,
	): Promise<ReturnSingleRecord<'comment', CommentResponse>> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId !== req.user.id) {
			throw new ForbiddenException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		const updatedComment = await this.commentResponseService.updateCommentResponse({ id, body });

		return Formatted.response({ comment: updatedComment });
	}

	@SwaggerDecorator(deleteCommentResponse)
	@Delete('/:id')
	async deleteCommentResponse(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<ReturnDeletedMessage<'message', string>> {
		const comment = await this.commentResponseService.getCommentResponse(id);

		if (!comment) {
			throw new NotFoundException(COMMENT_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (comment?.userId !== req.user.id) {
			throw new ForbiddenException(THIS_COMMENT_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		await this.commentResponseService.deleteCommentResponse(id);

		return Formatted.response({ message: COMMENT_DELETED_SUCCESFULLY });
	}
}
