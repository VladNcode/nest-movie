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
} from '@nestjs/common';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ITEM_NOT_FOUND } from '../like/like.constants';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrUpdateRatingDto } from './dto/create-or-update-rating.dto';
import { DeleteRatingDto } from './dto/delete-rating.dto';
import { RATING_DELETED_SUCCESSFULLY } from './rating.constants';
import { RatingService } from './rating.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('ratings')
export class RatingController {
	constructor(
		private readonly ratingService: RatingService,
		private readonly prisma: PrismaService,
	) {}

	@Post('/')
	async create(@Request() req: ReqUserDto, @Body() dto: CreateOrUpdateRatingDto) {
		const { ratingType, typeId, score } = dto;

		const record = this.prisma.checkIfRecordExists(ratingType, typeId);

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
	async update(@Request() req: ReqUserDto, @Body() dto: CreateOrUpdateRatingDto) {
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
	async delete(@Request() req: ReqUserDto, @Body() { ratingType, typeId }: DeleteRatingDto) {
		await this.ratingService.deleteRating({
			ratingType,
			typeId,
			userId: req.user.id,
		});

		return { status: 'success', message: RATING_DELETED_SUCCESSFULLY };
	}
}
