import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
	@IsString()
	@IsNotEmpty()
	username: string;

	@IsString()
	@IsNotEmpty()
	bio: string;

	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	passwordHash: string;

	passwordChangedAt: Date;
}
