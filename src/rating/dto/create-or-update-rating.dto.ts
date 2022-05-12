import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateOrUpdateRatingDto {
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;

	@IsInt()
	@Min(1)
	@Max(5)
	score: number;

	userId: number;
}
