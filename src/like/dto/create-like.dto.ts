import { ApiProperty } from '@nestjs/swagger';
import { LikeType } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrDeleteLikeDto {
	@ApiProperty({ required: true, example: 1 })
	@IsNotEmpty()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	typeId: number;

	@ApiProperty({ required: true, enum: ['movie', 'actor', 'review', 'comment', 'commentResponse'] })
	@IsNotEmpty()
	@IsIn(['movie', 'actor', 'review', 'comment', 'commentResponse'])
	likeType: LikeType;
}
