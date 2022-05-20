import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
	@ApiProperty({ example: 'newPassword', description: 'New Password', minLength: 8, maxLength: 24 })
	@IsString()
	@Length(8, 24)
	password: string;
}
