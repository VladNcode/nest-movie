import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateActorDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	tag: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	photo: string;
}
