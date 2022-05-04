import { Module } from '@nestjs/common';
import { UserController } from './user/user.controller';
import { AuthController } from './auth/auth.controller';
import { ReviewController } from './review/review.controller';
import { ActorController } from './actor/actor.controller';
import { CommentController } from './comment/comment.controller';
import { Comment4commentController } from './comment4comment/comment4comment.controller';
import { LikeController } from './like/like.controller';
import { MovieController } from './movie/movie.controller';
import { MovieService } from './movie/movie.service';
import { Comment4commentService } from './comment4comment/comment4comment.service';
import { ActorService } from './actor/actor.service';
import { AuthService } from './auth/auth.service';
import { CommentService } from './comment/comment.service';
import { LikeService } from './like/like.service';
import { ReviewService } from './review/review.service';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';

@Module({
	imports: [],
	controllers: [
		UserController,
		AuthController,
		ReviewController,
		ActorController,
		CommentController,
		Comment4commentController,
		LikeController,
		MovieController,
	],
	providers: [
		MovieService,
		Comment4commentService,
		ActorService,
		AuthService,
		CommentService,
		LikeService,
		ReviewService,
		UserService,
		PrismaService,
	],
})
export class AppModule {}
