import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReviewCreateDto {
	@ApiProperty({ required: true, example: 'Excelsior!' })
	@IsString()
	@IsNotEmpty()
	body: string;

	@ApiProperty({ required: true, example: 2 })
	@IsInt()
	@IsNotEmpty()
	movieId: number;

	userId: number;
}
