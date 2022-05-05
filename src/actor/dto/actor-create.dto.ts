import { IsString } from 'class-validator';

export class ActorCreateDto {
	@IsString()
	firstName: string;

	@IsString()
	lastName: string;

	@IsString()
	photo: string;
}
