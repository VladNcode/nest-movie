import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@IsString()
	@Length(8, 24)
	password: string;

	@IsString()
	@IsNotEmpty()
	avatar: string;

	@IsString()
	@IsNotEmpty()
	bio: string;

	@IsString()
	@IsNotEmpty()
	username: string;
}
