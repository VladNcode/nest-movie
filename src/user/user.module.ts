import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getMulterConfig } from '../configs/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
	imports: [
		MulterModule.registerAsync({
			imports: [ConfigModule],
			useFactory: getMulterConfig,
			inject: [ConfigService],
		}),
	],
	providers: [UserService, PrismaService],
	exports: [UserService],
	controllers: [UserController],
})
export class UserModule {}
