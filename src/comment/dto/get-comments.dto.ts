import { ApiProperty } from '@nestjs/swagger';
import { CommentType, Prisma } from '@prisma/client';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { LimitId } from '../../decorators/limitId.decorator';

export class GetCommentsDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	id: number;

	@ApiProperty({ required: false, example: 3 })
	@IsOptional()
	@LimitId()
	userId: number;

	@ApiProperty({ required: false, enum: ['movie', 'actor', 'review'] })
	@IsOptional()
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	commentType: CommentType;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	typeId: number;

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
