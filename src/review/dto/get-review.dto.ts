import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class GetReviewsDto {
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	userId: number;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	movieId: number;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	skip: number;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	take: number;

	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order: Prisma.SortOrder;
}
