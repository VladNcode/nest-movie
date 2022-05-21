import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class RegisterDto {
	@ApiProperty({ required: true, example: 'testing@example.com', description: 'Email' })
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ required: true, example: 'testuser', description: 'Username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ required: true, example: 'testpass', description: 'Password', minLength: 8, maxLength: 24 })
	@IsString()
	@Length(8, 24)
	password: string;

	@ApiProperty({ required: true, example: 'I am pikachu!', description: 'Bio' })
	@IsString()
	@IsNotEmpty()
	bio: string;
}
