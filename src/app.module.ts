import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { path } from 'app-root-path';
import { join } from 'path';

import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { CommentResponseModule } from './comment-response/comment-response.module';
import { LikeModule } from './like/like.module';
import { RatingModule } from './rating/rating.module';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(path, 'uploads'),
			exclude: ['/api*'],
		}),
		ConfigModule.forRoot({
			envFilePath: `${process.env.NODE_ENV === 'dev' ? '.development.env' : '.env'}`,
		}),
		AuthModule,
		UserModule,
		MovieModule,
		ActorModule,
		ReviewModule,
		CommentModule,
		CommentResponseModule,
		LikeModule,
		RatingModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
