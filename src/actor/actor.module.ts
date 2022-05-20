import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../configs/multer.config';
import { FileService } from '../helpers';
import { PrismaService } from '../prisma/prisma.service';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';

@Module({
	imports: [
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getMulterConfig,
			inject: [ConfigService],
		}),
		FileService,
	],
	providers: [ActorService, PrismaService],
	exports: [ActorService],
	controllers: [ActorController],
})
export class ActorModule {}
