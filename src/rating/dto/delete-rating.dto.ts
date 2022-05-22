import { ApiProperty } from '@nestjs/swagger';
import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class GetOrDeleteRatingDto {
	@ApiProperty({ required: true, example: 1 })
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@ApiProperty({ required: true, enum: ['movie', 'actor', 'review'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;

	userId: number;
}
