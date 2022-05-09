import { IsNotEmpty, IsString } from 'class-validator';

export class ActorCreateDto {
	@IsString()
	@IsNotEmpty()
	tag: string;

	@IsString()
	@IsNotEmpty()
	firstName: string;

	@IsString()
	@IsNotEmpty()
	lastName: string;

	@IsString()
	@IsNotEmpty()
	photo: string;
}
