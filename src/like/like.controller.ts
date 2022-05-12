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
} from '@nestjs/common';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';
import { ITEM_NOT_FOUND, LIKE_DELETED_SUCCESSFULLY } from './like.constants';
import { LikeService } from './like.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikeController {
	constructor(private readonly likeService: LikeService, private readonly prisma: PrismaService) {}

	@Post('/')
	async create(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		const record = this.prisma.checkIfRecordExists(likeType, typeId);

		if (!record) {
			throw new NotFoundException(ITEM_NOT_FOUND(likeType));
		}

		const like = await this.likeService.createLike(likeType, typeId, req.user.id);

		return { status: 'success', like };
	}

	@Delete('/')
	@HttpCode(204)
	async delete(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		await this.likeService.deleteLike(likeType, typeId, req.user.id);

		return { status: 'success', message: LIKE_DELETED_SUCCESSFULLY };
	}
}
