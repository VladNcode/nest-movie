import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Comment4commentController } from './comment4comment.controller';
import { Comment4commentService } from './comment4comment.service';

@Module({
	providers: [Comment4commentService, PrismaService],
	exports: [Comment4commentService],
	controllers: [Comment4commentController],
})
export class Comment4commentModule {}
