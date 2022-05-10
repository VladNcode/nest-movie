import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
	providers: [CommentService, PrismaService],
	exports: [CommentService],
	controllers: [CommentController],
})
export class CommentModule {}
