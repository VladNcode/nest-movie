import { IsString } from 'class-validator';

export class UserCreateDto {
	@IsString()
	username: string;

	@IsString()
	bio: string;

	@IsString()
	avatar: string;

	@IsString()
	email: string;

	@IsString()
	passwordHash: string;
}
