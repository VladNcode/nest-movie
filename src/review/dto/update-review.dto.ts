import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto {
	@IsString()
	@IsNotEmpty()
	body: string;
}
