import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
	@ApiProperty({ required: false, example: 'Pika-pi!', description: 'New bio' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	bio: string;

	@ApiProperty({ required: false, example: 'Pikachu', description: 'New username' })
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Length(4, 24)
	username: string;
}
