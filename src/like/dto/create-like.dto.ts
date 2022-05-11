import { LikeType } from '@prisma/client';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrDeleteLikeDto {
	@IsInt()
	@IsNotEmpty()
	typeId: number;

	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review', 'comment', 'comment4Comment'])
	likeType: LikeType;
}
