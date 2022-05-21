import { ApiProperty } from '@nestjs/swagger';
import { CommentType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateCommentDto {
	@ApiProperty({ required: false, example: 1 })
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@ApiProperty({ required: false, enum: ['movie', 'actor', 'review'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	commentType: CommentType;

	@ApiProperty({ required: false, example: 'your comment text' })
	@IsNotEmpty()
	@IsString()
	body: string;

	userId: number;
}
