import {
	Body,
	Controller,
	NotFoundException,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
	Request,
	Delete,
	Patch,
	Get,
	BadRequestException,
} from '@nestjs/common';
import { Rating } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import { COULD_NOT_FIND_AVERAGE, RATING_DELETED_SUCCESSFULLY, USER_HAVE_NOT_RATED_YET } from './rating.constants';
import { RatingService } from './rating.service';
import { Formatted } from '../helpers';

import { CreateOrUpdateRatingDto, GetOrDeleteRatingDto, FindRatingAverageDto } from 'src/exports/dto';
import {
	UserAlreadyRated,
	ReqUser,
	ReturnDeletedMessage,
	ReturnSingleRecord,
	GetAverageRating,
} from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService, private readonly prisma: PrismaService) {}

	@Get('/')
	async userAlreadyRated(
		@Request() req: ReqUser,
		@Body() { ratingType, typeId }: GetOrDeleteRatingDto,
	): Promise<UserAlreadyRated> {
		const record = await this.prisma.checkIfRecordExists({ type: ratingType, id: typeId });
		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const rated = await this.ratingService.getRating({ ratingType, typeId, userId: req.user.id });
		if (!rated) {
			return Formatted.response({ message: USER_HAVE_NOT_RATED_YET });
		}

		return Formatted.response({ userRating: rated });
	}

	@Get('/avg')
	async getAverage(@Body() { ratingType, typeId }: FindRatingAverageDto): Promise<GetAverageRating> {
		const record = await this.prisma.checkIfRecordExists({ type: ratingType, id: typeId });
		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const avg = await this.ratingService.findRatingAverage({ type: ratingType, id: typeId });
		if (!avg) {
			throw new BadRequestException(COULD_NOT_FIND_AVERAGE);
		}

		return Formatted.response({ type: ratingType, id: typeId, ratingAverage: Math.floor(avg) });
	}

	@Post('/')
	async create(
		@Request() req: ReqUser,
		@Body() dto: CreateOrUpdateRatingDto,
	): Promise<ReturnSingleRecord<'rating', Rating>> {
		const { ratingType, typeId, score } = dto;

		const record = await this.prisma.checkIfRecordExists({ type: ratingType, id: typeId });

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const rating = await this.ratingService.createRating({
			ratingType,
			typeId,
			score,
			userId: req.user.id,
		});

		return Formatted.response({ rating });
	}

	@Patch('/')
	async update(
		@Request() req: ReqUser,
		@Body() dto: CreateOrUpdateRatingDto,
	): Promise<ReturnSingleRecord<'rating', Rating>> {
		const { ratingType, typeId, score } = dto;

		const updatedRating = await this.ratingService.updateRating({
			ratingType,
			typeId,
			score,
			userId: req.user.id,
		});

		return Formatted.response({ rating: updatedRating });
	}

	@Delete('/')
	async delete(
		@Request() req: ReqUser,
		@Body() { ratingType, typeId }: GetOrDeleteRatingDto,
	): Promise<ReturnDeletedMessage<'message', string>> {
		await this.ratingService.deleteRating({
			ratingType,
			typeId,
			userId: req.user.id,
		});

		return Formatted.response({ message: RATING_DELETED_SUCCESSFULLY });
	}
}
