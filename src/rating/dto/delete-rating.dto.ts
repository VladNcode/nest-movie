import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class GetOrDeleteRatingDto {
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;

	userId: number;
}
