import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe,
	Request,
	Patch,
	Param,
	ParseIntPipe,
	NotFoundException,
	Delete,
	Get,
	Query,
	UnauthorizedException,
	ForbiddenException,
} from '@nestjs/common';
import { Review } from '@prisma/client';

import {
	REVIEW_DELETED,
	REVIEW_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER,
} from './review.constants';
import { ReviewService } from './review.service';
import { Formatted } from '../helpers';

import { ReviewCreateDto, GetReviewsDto, UpdateReviewDto } from 'src/exports/dto';
import { ReqUser, ReturnManyRecords, ReturnSingleRecord, ReturnDeletedMessage } from 'src/exports/interfaces';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { createReview, deleteReview, getReview, getReviews, updateReview } from '../swagger/review/review.decorators';

@UsePipes(new ValidationPipe({ transform: true }))
@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@SwaggerDecorator(getReviews)
	@Get('/')
	async getReviews(@Query() query: GetReviewsDto): Promise<ReturnManyRecords<'reviews', Review[]>> {
		const { skip, take, movieId, userId, id, order } = query;

		const reviews = await this.reviewService.getReviews({
			skip: skip || 0,
			take: take || 100,
			where: { id, movieId, userId },
			orderBy: { id: order },
		});

		return Formatted.response({ results: reviews.length, reviews });
	}

	@SwaggerDecorator(getReview)
	@Get('/:id')
	async getReview(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'review', Review>> {
		const review = await this.reviewService.getReview(id);
		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return Formatted.response({ review });
	}

	@SwaggerDecorator(createReview)
	@Post('/')
	async createReview(
		@Request() req: ReqUser,
		@Body() { movieId, body }: ReviewCreateDto,
	): Promise<ReturnSingleRecord<'review', Review>> {
		const review = await this.reviewService.createReview({ movieId, body, userId: req.user.id });

		return Formatted.response({ review });
	}

	@SwaggerDecorator(updateReview)
	@Patch('/:id')
	async updateReview(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateReviewDto,
	): Promise<ReturnSingleRecord<'review', Review>> {
		const review = await this.reviewService.getReview(id);
		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (review?.userId !== req.user.id || req.user.role !== 'admin') {
			throw new ForbiddenException(THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		const updatedReview = await this.reviewService.updateReview({ id, body });

		return Formatted.response({ review: updatedReview });
	}

	@SwaggerDecorator(deleteReview)
	@Delete('/:id')
	async deleteReview(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<ReturnDeletedMessage<'message', string>> {
		const review = await this.reviewService.getReview(id);

		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (review?.userId !== req.user.id || req.user.role !== 'admin') {
			throw new UnauthorizedException(THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		await this.reviewService.deleteReview(id);

		return Formatted.response({ message: REVIEW_DELETED });
	}
}
