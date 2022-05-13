import { CommentType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrUpdateCommentDto {
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review'])
	commentType: CommentType;

	@IsNotEmpty()
	@IsString()
	body: string;

	userId: number;
}
