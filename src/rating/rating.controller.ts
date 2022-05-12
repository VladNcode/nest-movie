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
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateRatingDto } from './dto/create-or-update-rating.dto';
import { DeleteRatingDto } from './dto/delete-rating.dto';
import { FindRatingAverageDto } from './dto/find-average-rating.dto';
import { COULD_NOT_FIND_AVERAGE, RATING_DELETED_SUCCESSFULLY } from './rating.constants';
import { RatingService } from './rating.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingController {
	constructor(
		private readonly ratingService: RatingService,
		private readonly prisma: PrismaService,
	) {}

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
					ratingAverage: avg,
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
		@Body() { ratingType, typeId }: DeleteRatingDto,
	): Promise<{ status: string; message: string }> {
		await this.ratingService.deleteRating({
			ratingType,
			typeId,
			userId: req.user.id,
		});

		return { status: 'success', message: RATING_DELETED_SUCCESSFULLY };
	}
}
