import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReviewCreateDto {
	@IsString()
	@IsNotEmpty()
	body: string;

	@IsInt()
	@IsNotEmpty()
	movieId: number;

	userId: number;
}
