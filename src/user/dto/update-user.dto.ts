import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	bio: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	avatar: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Length(4, 24)
	username: string;
}
