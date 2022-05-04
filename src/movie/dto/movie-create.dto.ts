import { IsArray, IsDate, IsString } from 'class-validator';

export class MovieCreateDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsDate()
	releaseDate: Date;

	@IsArray()
	actors: [string];
}
