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
	HttpCode,
	Get,
} from '@nestjs/common';
import { Rating } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards/';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import { COULD_NOT_FIND_AVERAGE, RATING_DELETED_SUCCESSFULLY, USER_HAVE_NOT_RATED_YET } from './rating.constants';
import { RatingService } from './rating.service';

import { ReqUserDto, CreateOrUpdateRatingDto, GetOrDeleteRatingDto, FindRatingAverageDto } from 'src/exports/dto';
import { UserAlreadyRated } from 'src/exports/interfaces';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('rating')
export class RatingController {
	constructor(private readonly ratingService: RatingService, private readonly prisma: PrismaService) {}

	@Get('/')
	async userAlreadyRated(
		@Request() req: ReqUserDto,
		@Body() { ratingType, typeId }: GetOrDeleteRatingDto,
	): Promise<UserAlreadyRated> {
		const record = await this.prisma.checkIfRecordExists(ratingType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const rated = await this.ratingService.getRating({ ratingType, typeId, userId: req.user.id });
		if (!rated) {
			return { status: 'success', message: USER_HAVE_NOT_RATED_YET };
		}

		return { status: 'success', userRating: rated };
	}

	@Get('/avg')
	async getAverage(@Body() { ratingType, typeId }: FindRatingAverageDto) {
		const record = await this.prisma.checkIfRecordExists(ratingType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const avg = await this.ratingService.findRatingAverage(ratingType, typeId);

		if (avg) {
			return {
				status: 'success',
				data: {
					type: ratingType,
					id: typeId,
					ratingAverage: Math.floor(avg),
				},
			};
		} else {
			return { status: 'failure', message: COULD_NOT_FIND_AVERAGE };
		}
	}

	@Post('/')
	async create(
		@Request() req: ReqUserDto,
		@Body() dto: CreateOrUpdateRatingDto,
	): Promise<{ status: string; rating: Rating }> {
		const { ratingType, typeId, score } = dto;

		const record = await this.prisma.checkIfRecordExists(ratingType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(ratingType));
		}

		const rating = await this.ratingService.createRating({
			ratingType,
			typeId,
			score,
			userId: req.user.id,
		});

		return { status: 'success', rating };
	}

	@Patch('/')
	async update(
		@Request() req: ReqUserDto,
		@Body() dto: CreateOrUpdateRatingDto,
	): Promise<{ status: string; rating: Rating }> {
		const { ratingType, typeId, score } = dto;

		const updatedRating = await this.ratingService.updateRating({
			ratingType,
			typeId,
			score,
			userId: req.user.id,
		});

		return { status: 'success', rating: updatedRating };
	}

	@Delete('/')
	@HttpCode(204)
	async delete(
		@Request() req: ReqUserDto,
		@Body() { ratingType, typeId }: GetOrDeleteRatingDto,
	): Promise<{ status: string; message: string }> {
		await this.ratingService.deleteRating({
			ratingType,
			typeId,
			userId: req.user.id,
		});

		return { status: 'success', message: RATING_DELETED_SUCCESSFULLY };
	}
}
