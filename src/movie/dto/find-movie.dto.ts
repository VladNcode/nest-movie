import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class FindMovieDto {
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@IsOptional()
	@IsString()
	title: string;

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
