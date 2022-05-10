import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserEmailDto {
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
