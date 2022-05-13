import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentResponseDto {
	@IsInt()
	@IsNotEmpty()
	commentId: number;

	@IsNotEmpty()
	@IsString()
	body: string;

	userId: number;
}
