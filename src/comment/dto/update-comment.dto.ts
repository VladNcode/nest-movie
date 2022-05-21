import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentDto {
	@ApiProperty({ required: true, example: 'Update comment text' })
	@IsString()
	@IsNotEmpty()
	body: string;
}
