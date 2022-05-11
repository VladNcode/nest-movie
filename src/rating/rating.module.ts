import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RatingService } from './rating.service';

@Module({
	providers: [RatingService, PrismaService],
	exports: [RatingService],
})
export class RatingModule {}
