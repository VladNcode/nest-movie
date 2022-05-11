import {
	Body,
	Controller,
	Delete,
	Post,
	UsePipes,
	ValidationPipe,
	Request,
	UseGuards,
} from '@nestjs/common';
import { ReqUserDto } from '../auth/dto/req-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateOrDeleteLikeDto } from './dto/create-like.dto';
import { LikeService } from './like.service';

@UsePipes(new ValidationPipe({ transform: true }))
@UseGuards(JwtAuthGuard)
@Controller('likes')
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@Post('/')
	async create(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		return this.likeService.createLike(likeType, typeId, req.user.id);
	}

	@Delete('/')
	async delete(@Request() req: ReqUserDto, @Body() { likeType, typeId }: CreateOrDeleteLikeDto) {
		return this.likeService.deleteLike(likeType, typeId, req.user.id);
	}
}
