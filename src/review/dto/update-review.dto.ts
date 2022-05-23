import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReviewDto {
	@ApiProperty({ required: true, example: 'Excelsior!' })
	@IsString()
	@IsNotEmpty()
	body: string;
}
