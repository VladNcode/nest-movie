import { IsString, Length } from 'class-validator';

export class UpdateUserPasswordDto {
	@IsString()
	@Length(8, 24)
	password: string;
}
