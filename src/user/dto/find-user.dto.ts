import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class FindUserDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	id: number;

	@ApiProperty({ required: false, example: 'Pikachu' })
	@IsOptional()
	@IsString()
	username: string;

	@ApiProperty({ required: false, example: 'Pikachu@example.com' })
	@IsOptional()
	@IsString()
	email: string;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	skip: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@Transform(({ value }) => parseInt(value))
	@IsInt()
	take: number;

	@ApiProperty({ required: false, enum: ['asc', 'desc'] })
	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order: Prisma.SortOrder;
}
