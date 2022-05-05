import { IsDate, IsOptional, IsString } from 'class-validator';

export class UpdateMovieDto {
	@IsOptional()
	@IsString()
	title: string;

	@IsOptional()
	@IsString()
	description: string;

	@IsOptional()
	@IsDate()
	releaseDate: Date;
}
