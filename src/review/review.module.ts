import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
	providers: [ReviewService, PrismaService],
	exports: [ReviewService],
	controllers: [ReviewController],
})
export class ReviewModule {}
