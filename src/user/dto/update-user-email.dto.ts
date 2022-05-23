import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserEmailDto {
	@ApiProperty({ required: true, example: 'testingUpdate@example.com', description: 'New Email' })
	@IsString()
	@IsEmail()
	@IsNotEmpty()
	email: string;
}
