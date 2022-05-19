import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
	@ApiProperty({ example: 'testing4', description: 'Username' })
	@IsString()
	@IsNotEmpty()
	username: string;

	@ApiProperty({ example: 'testing4', description: 'Password' })
	@IsString()
	@IsNotEmpty()
	password: string;
}
