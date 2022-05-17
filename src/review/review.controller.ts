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
} from '@nestjs/common';
import { Review } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/';
import {
	REVIEW_DELETED,
	REVIEW_WITH_THIS_ID_DOES_NOT_EXIST,
	THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER,
} from './review.constants';
import { ReviewService } from './review.service';

import { ReviewCreateDto, GetReviewsDto, UpdateReviewDto } from 'src/exports/dto';
import { ReturnUpdatedReview, ReqUser } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get('/:id')
	async getReview(@Param('id', ParseIntPipe) id: number): Promise<{
		status: string;
		review: Review;
	}> {
		const review = await this.reviewService.getReview(id);
		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		return { status: 'success', review };
	}

	@Get('/')
	async getReviews(@Query() query: GetReviewsDto): Promise<{
		status: string;
		data: { results: number; reviews: Review[] };
	}> {
		const { skip, take, movieId, userId, id, order } = query;

		const reviews = await this.reviewService.getReviews({
			skip: skip || 0,
			take: take || 100,
			where: { id, movieId, userId },
			orderBy: { id: order },
		});

		return {
			status: 'success',
			data: {
				results: reviews.length,
				reviews,
			},
		};
	}

	@Post('/')
	async createReview(
		@Request() req: ReqUser,
		@Body() { movieId, body }: ReviewCreateDto,
	): Promise<{ status: string; data: Review }> {
		const review = await this.reviewService.createReview({ movieId, body, userId: req.user.id });
		return { status: 'success', data: review };
	}

	@Patch('/:id')
	async updateReview(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
		@Body() { body }: UpdateReviewDto,
	): Promise<ReturnUpdatedReview> {
		const review = await this.reviewService.getReview(id);

		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (review?.userId === req.user.id) {
			const updatedReview = await this.reviewService.updateReview(id, body);
			return { status: 'success', review: updatedReview };
		}

		return { status: 'failure', message: THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER };
	}

	@Delete('/:id')
	async deleteReview(
		@Request() req: ReqUser,
		@Param('id', ParseIntPipe) id: number,
	): Promise<{ status: string; message: string }> {
		const review = await this.reviewService.getReview(id);

		if (!review) {
			throw new NotFoundException(REVIEW_WITH_THIS_ID_DOES_NOT_EXIST);
		}

		if (review?.userId === req.user.id) {
			await this.reviewService.deleteReview(id);
			return { status: 'success', message: REVIEW_DELETED };
		}

		return { status: 'failure', message: THIS_REVIEW_DOES_NOT_BELONG_TO_CURRENT_USER };
	}
}
