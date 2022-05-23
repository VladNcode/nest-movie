import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class GetReviewsDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@ApiProperty({ required: false, example: 3 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	userId: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	movieId: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	skip: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	take: number;

	@ApiProperty({ required: false, enum: ['asc', 'desc'] })
	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order: Prisma.SortOrder;
}
