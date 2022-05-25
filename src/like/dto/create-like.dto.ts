import { ApiProperty } from '@nestjs/swagger';
import { LikeType } from '@prisma/client';
import { IsIn, IsNotEmpty } from 'class-validator';
import { LimitId } from '../../decorators/limitId.decorator';

export class CreateOrDeleteLikeDto {
	@ApiProperty({ required: true, example: 1 })
	@IsNotEmpty()
	@LimitId()
	typeId: number;

	@ApiProperty({ required: true, enum: ['movie', 'actor', 'review', 'comment', 'commentResponse'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review', 'comment', 'commentResponse'])
	likeType: LikeType;
}
