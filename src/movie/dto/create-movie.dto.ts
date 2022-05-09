import { IsArray, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateMovieDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
		message: '$property must be formatted as yyyy-mm-dd',
	})
	releaseDate: Date;

	@IsArray()
	@IsNotEmpty({ each: true })
	actors: [string];
}
