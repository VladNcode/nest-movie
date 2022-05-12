import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class FindRatingAverageDto {
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;
}
