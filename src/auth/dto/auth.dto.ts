import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@ApiProperty({ example: 'testuser', description: 'Username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ example: 'testpass', description: 'Password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
