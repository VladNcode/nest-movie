import { ApiProperty } from '@nestjs/swagger';
import { RatingType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class FindRatingAverageDto {
	@ApiProperty({ required: true, example: 2 })
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@ApiProperty({ required: true, enum: ['movie', 'actor', 'review'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	ratingType: RatingType;
}
