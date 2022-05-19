import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ActorCreateDto {
	@ApiProperty({ example: 'Nicolas Cage' })
	@IsString()
	@IsNotEmpty()
	tag: string;

	@ApiProperty({ example: 'Nicolas' })
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ example: 'Cage' })
	@IsString()
	@IsNotEmpty()
	lastName: string;
}
