import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentResponseDto {
	@ApiProperty({ required: true, example: 'Update comment text' })
	@IsString()
	@IsNotEmpty()
	body: string;
}
