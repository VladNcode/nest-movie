import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActorDto {
	@ApiProperty({ required: false, example: 'Nicolas' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ required: false, example: 'Rage' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ required: false, example: 'Nicolas Cage' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	tag: string;
}
