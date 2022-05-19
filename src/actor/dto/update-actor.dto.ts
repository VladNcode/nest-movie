import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActorDto {
	@ApiProperty({ example: 'Nicolas' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@ApiProperty({ example: 'Rage' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@ApiProperty({ example: 'Nicolas Cage' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	tag: string;
}
