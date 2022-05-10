import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	bio: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	avatar: string;
}
