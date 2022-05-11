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
} from '@nestjs/common';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';
import { ITEM_NOT_FOUND } from './like.constants';
import { LikeService } from './like.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikeController {
	constructor(private readonly likeService: LikeService, private readonly prisma: PrismaService) {}

	@Post('/')
	async create(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		const type = {
			movie: await this.prisma.movie.findUnique({ where: { id: typeId } }),
			actor: await this.prisma.actor.findUnique({ where: { id: typeId } }),
			review: await this.prisma.review.findUnique({ where: { id: typeId } }),
			comment: await this.prisma.comment.findUnique({ where: { id: typeId } }),
			comment4Comment: await this.prisma.comment4Comment.findUnique({ where: { id: typeId } }),
		};

		if (!type[likeType]) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		return this.likeService.createLike(likeType, typeId, req.user.id);
	}

	@Delete('/')
	async delete(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		return this.likeService.deleteLike(likeType, typeId, req.user.id);
	}
}
