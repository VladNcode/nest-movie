import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@ApiProperty({ required: true, example: 'testuser', description: 'Username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ required: true, example: 'testpass', description: 'Password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
