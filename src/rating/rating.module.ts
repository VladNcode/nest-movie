import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RatingService } from './rating.service';
import { RatingController } from './rating.controller';

@Module({
	providers: [RatingService, PrismaService],
	exports: [RatingService],
	controllers: [RatingController],
})
export class RatingModule {}
