import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
	@ApiProperty({ required: false, example: 'updated title' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ required: false, example: 'updated description' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ required: false, example: '2021-03-12' })
	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	releaseDate: Date;

	@ApiProperty({ required: true, example: ['Nicolas Cage', 'Emily Tosta', 'Beth Grant'] })
	@IsOptional()
	@ArrayNotEmpty()
	@IsArray()
	@IsNotEmpty({ each: true })
	actors: [string];
}
