import { ApiProperty } from '@nestjs/swagger';
import { CommentType, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Max } from 'class-validator';

//TODO Max number applyDecorators
export class GetCommentsDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Max(999999999999999)
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@ApiProperty({ required: false, example: 3 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	userId: number;

	@ApiProperty({ required: false, enum: ['movie', 'actor', 'review'] })
	@IsOptional()
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	commentType: CommentType;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	typeId: number;

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
