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
	HttpCode,
	Get,
} from '@nestjs/common';
import { Like } from '@prisma/client';

import { JwtAuthGuard } from '../auth/guards';
import { PrismaService } from '../prisma/prisma.service';
import { COULD_NOT_COUNT_LIKES, ITEM_NOT_FOUND, LIKE_DELETED_SUCCESSFULLY } from './like.constants';
import { LikeService } from './like.service';

import { CountLikes, ReqUser } from 'src/exports/interfaces';
import { CreateOrDeleteLikeDto } from 'src/exports/dto';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikeController {
	constructor(private readonly likeService: LikeService, private readonly prisma: PrismaService) {}

	@Get('/userLike')
	async userAlreadyLiked(
		@Request() req: ReqUser,
		@Body() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<{ status: string; userLiked: boolean }> {
		const record = await this.prisma.checkIfRecordExists(likeType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const liked = await this.likeService.findLike({ likeType, typeId, userId: req.user.id });

		if (!liked) {
			return { status: 'success', userLiked: false };
		}

		return { status: 'success', userLiked: true };
	}

	@Get('/count')
	async count(@Body() { likeType, typeId }: CreateOrDeleteLikeDto): Promise<CountLikes> {
		const record = await this.prisma.checkIfRecordExists(likeType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const count = await this.likeService.countLikes(likeType, typeId);

		if (count) {
			return {
				status: 'success',
				data: { type: likeType, id: typeId, likeCount: count },
			};
		}

		throw new NotFoundException(COULD_NOT_COUNT_LIKES);
	}

	@Post('/')
	async create(
		@Request() req: ReqUser,
		@Body() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<{ status: string; like: Like }> {
		const record = await this.prisma.checkIfRecordExists(likeType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const like = await this.likeService.createLike({ likeType, typeId, userId: req.user.id });

		return { status: 'success', like };
	}

	@Delete('/')
	@HttpCode(204)
	async delete(
		@Request() req: ReqUser,
		@Body() { likeType, typeId }: CreateOrDeleteLikeDto,
	): Promise<{ status: string; message: string }> {
		await this.likeService.deleteLike({ likeType, typeId, userId: req.user.id });

		return { status: 'success', message: LIKE_DELETED_SUCCESSFULLY };
	}
}
