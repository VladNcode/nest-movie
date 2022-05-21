import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActorCreateDto {
	@ApiProperty({ required: true, example: 'Nicolas Cage' })
	@IsString()
	@IsNotEmpty()
	tag: string;

	@ApiProperty({ required: true, example: 'Nicolas' })
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ required: true, example: 'Cage' })
	@IsString()
	@IsNotEmpty()
	lastName: string;
}
