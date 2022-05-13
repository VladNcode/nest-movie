import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommentResponseController } from './comment-response.controller';
import { CommentResponseService } from './comment-response.service';

@Module({
	providers: [CommentResponseService, PrismaService],
	exports: [CommentResponseService],
	controllers: [CommentResponseController],
})
export class CommentResponseModule {}
