import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description: string;

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	releaseDate: Date;
}
