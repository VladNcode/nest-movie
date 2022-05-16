import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { getMulterConfig } from '../configs/multer.config';
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
	],
	providers: [ActorService, PrismaService],
	exports: [ActorService],
	controllers: [ActorController],
})
export class ActorModule {}
