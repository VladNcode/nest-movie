import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ActorModule } from './actor/actor.module';
import { ReviewModule } from './review/review.module';
import { CommentModule } from './comment/comment.module';
import { Comment4commentModule } from './comment4comment/comment4comment.module';
import { LikeModule } from './like/like.module';
import { RatingModule } from './rating/rating.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `${process.env.NODE_ENV === 'dev' ? '.development.env' : '.env'}`,
		}),
		AuthModule,
		UserModule,
		MovieModule,
		ActorModule,
		ReviewModule,
		CommentModule,
		Comment4commentModule,
		LikeModule,
		RatingModule,
	],
	controllers: [],
	providers: [PrismaService],
})
export class AppModule {}
