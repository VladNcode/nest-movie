import {
	Body,
	Controller,
	Delete,
	Post,
	UsePipes,
	ValidationPipe,
	Request,
	UseGuards,
	NotFoundException,
	Get,
	Query,
	BadRequestException,
} from '@nestjs/common';
import { Like } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards';
import { PrismaService } from '../prisma/prisma.service';
import { ITEM_NOT_FOUND, LIKE_DELETED_SUCCESSFULLY, NOT_LIKED } from './like.constants';
import { LikeService } from './like.service';
import { Formatted } from '../helpers';
import { SwaggerDecorator } from '../decorators/swagger.decorator';
import { count, create, deleteLike, userAlreadyLiked } from '../swagger/like/like.decorators';

import { CountLikes, ReqUser, ReturnDeletedMessage, ReturnSingleRecord } from 'src/exports/interfaces';
import { CreateOrDeleteLikeDto } from 'src/exports/dto';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@ApiTags('Likes')
@Controller('likes')
export class LikeController {
	constructor(private readonly likeService: LikeService, private readonly prisma: PrismaService) {}

	@SwaggerDecorator(userAlreadyLiked)
	@Get('/userLike')
	async userAlreadyLiked(
		@Request() req: ReqUser,
		@Query() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<ReturnSingleRecord<'userLiked', boolean>> {
		const record = await this.prisma.checkIfRecordExists({ type: likeType, id: typeId });

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const liked = await this.likeService.findLike({ likeType, typeId, userId: req.user.id });

		if (!liked) {
			return Formatted.response({ userLiked: false });
		}

		return Formatted.response({ userLiked: true });
	}

	@SwaggerDecorator(count)
	@Get('/count')
	async count(@Query() { likeType, typeId }: CreateOrDeleteLikeDto): Promise<CountLikes> {
		const record = await this.prisma.checkIfRecordExists({ type: likeType, id: typeId });

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const count = await this.likeService.countLikes({ type: likeType, id: typeId });

		return Formatted.response({ type: likeType, id: typeId, likeCount: count });
	}

	@SwaggerDecorator(create)
	@Post('/')
	async create(
		@Request() req: ReqUser,
		@Body() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<ReturnSingleRecord<'like', Like>> {
		const record = await this.prisma.checkIfRecordExists({ type: likeType, id: typeId });

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const like = await this.likeService.createLike({ likeType, typeId, userId: req.user.id });

		return Formatted.response({ like });
	}

	@SwaggerDecorator(deleteLike)
	@Delete('/')
	async delete(
		@Request() req: ReqUser,
		@Body() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<ReturnDeletedMessage<'message', string>> {
		const liked = await this.likeService.findLike({ likeType, typeId, userId: req.user.id });
		if (!liked) {
			throw new BadRequestException(NOT_LIKED);
		}

		await this.likeService.deleteLike({ likeType, typeId, userId: req.user.id });

		return Formatted.response({ message: LIKE_DELETED_SUCCESSFULLY });
	}
}
