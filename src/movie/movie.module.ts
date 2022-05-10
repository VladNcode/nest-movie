import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
	providers: [MovieService, PrismaService],
	exports: [MovieService],
	controllers: [MovieController],
})
export class MovieModule {}
