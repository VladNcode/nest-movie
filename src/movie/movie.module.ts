import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../configs/multer.config';
import { FileService } from '../helpers';
import { PrismaService } from '../prisma/prisma.service';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getMulterConfig,
			inject: [ConfigService],
		}),
		FileService,
	],
	providers: [MovieService, PrismaService],
	exports: [MovieService],
	controllers: [MovieController],
})
export class MovieModule {}
