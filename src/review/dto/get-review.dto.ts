import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { LimitId } from '../../decorators/limitId.decorator';

export class GetReviewsDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	id: number;

	@ApiProperty({ required: false, example: 3 })
	@IsOptional()
	@LimitId()
	userId: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	movieId: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	skip: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	take: number;

	@ApiProperty({ required: false, enum: ['asc', 'desc'] })
	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order: Prisma.SortOrder;
}
