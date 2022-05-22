import { ApiProperty } from '@nestjs/swagger';
import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, Max, Min } from 'class-validator';

export class CreateOrUpdateRatingDto {
	@ApiProperty({ required: true, example: 2 })
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@ApiProperty({ required: true, enum: ['movie', 'actor', 'review'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;

	@ApiProperty({ required: true, example: 5, minimum: 1, maximum: 5 })
	@IsInt()
	@Min(1)
	@Max(5)
	score: number;

	userId: number;
}
