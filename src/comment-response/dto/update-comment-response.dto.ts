import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCommentResponseDto {
	@IsString()
	@IsNotEmpty()
	body: string;
}
