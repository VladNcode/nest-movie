import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';

@Module({
	providers: [LikeService, PrismaService],
	exports: [LikeService],
	controllers: [LikeController],
})
export class LikeModule {}
