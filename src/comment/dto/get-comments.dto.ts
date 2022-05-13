import { CommentType, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetCommentsDto {
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	userId: number;

	@IsOptional()
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	commentType: CommentType;

	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	typeId: number;

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
