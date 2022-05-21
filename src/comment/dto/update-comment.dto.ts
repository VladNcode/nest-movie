import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
	@ApiProperty({ required: false, example: 'your comment text' })
	@IsString()
	@IsNotEmpty()
	body: string;
}
