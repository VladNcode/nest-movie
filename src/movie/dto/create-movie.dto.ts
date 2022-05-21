import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateMovieDto {
	@ApiProperty({ required: true, example: "Willy's Wonderland" })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({
		required: true,
		example:
			"A quiet drifter is tricked into a janitorial job at the now condemned Willy's Wonderland. The mundane tasks suddenly become an all-out fight for survival against wave after wave of demonic animatronics. Fists fly, kicks land, titans clash -- and only one side will make it out alive.",
	})
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ required: true, example: '2021-02-12' })
	@Matches(/^\d{4}(-)(((0)[0-9])|((1)[0-2]))(-)([0-2][0-9]|(3)[0-1])$/i, {
		message: '$property must be formatted as yyyy-mm-dd',
	})
	releaseDate: Date;

	@ApiProperty({ required: true, example: ['Nicolas Cage', 'Emily Tosta', 'Beth Grant'] })
	@IsArray()
	@ArrayNotEmpty()
	@IsNotEmpty({ each: true })
	actors: [string];
}
