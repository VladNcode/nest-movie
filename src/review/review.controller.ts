import {
	Body,
	Controller,
	Post,
	UseGuards,
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
} from '@nestjs/common';
import { Review } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/';
import {
	REVIEW_DELETED,
	REVIEW_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER,
} from './review.constants';
import { ReviewService } from './review.service';
import { Formatted } from '../helpers';

import { ReviewCreateDto, GetReviewsDto, UpdateReviewDto } from 'src/exports/dto';
import { ReqUser, ReturnManyRecords, ReturnSingleRecord, ReturnDeletedMessage } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

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

	@Get('/:id')
	async getReview(@Param('id', ParseIntPipe) id: number): Promise<ReturnSingleRecord<'review', Review>> {
		const review = await this.reviewService.getReview(id);
		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return Formatted.response({ review });
	}

	@Post('/')
	async createReview(
		@Request() req: ReqUser,
		@Body() { movieId, body }: ReviewCreateDto,
	): Promise<ReturnSingleRecord<'review', Review>> {
		const review = await this.reviewService.createReview({ movieId, body, userId: req.user.id });
		return Formatted.response({ review });
	}

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

		if (review?.userId !== req.user.id) {
			throw new UnauthorizedException(THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		const updatedReview = await this.reviewService.updateReview({ id, body });

		return Formatted.response({ review: updatedReview });
	}

	@Delete('/:id')
	async deleteReview(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<ReturnDeletedMessage<'message', string>> {
		const review = await this.reviewService.getReview(id);

		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (review?.userId !== req.user.id) {
			throw new UnauthorizedException(THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER);
		}

		await this.reviewService.deleteReview(id);

		return Formatted.response({ message: REVIEW_DELETED });
	}
}
