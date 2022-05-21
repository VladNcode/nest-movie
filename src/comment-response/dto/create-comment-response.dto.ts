import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentResponseDto {
	@ApiProperty({ required: false, example: 1 })
	@IsInt()
	@IsNotEmpty()
	commentId: number;

	@ApiProperty({ required: false, example: 'Comment response' })
	@IsNotEmpty()
	@IsString()
	body: string;

	userId: number;
}
