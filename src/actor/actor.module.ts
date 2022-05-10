import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ActorController } from './actor.controller';
import { ActorService } from './actor.service';

@Module({
	providers: [ActorService, PrismaService],
	exports: [ActorService],
	controllers: [ActorController],
})
export class ActorModule {}
