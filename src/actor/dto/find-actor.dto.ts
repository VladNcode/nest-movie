import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { LimitId } from '../../decorators/limitId.decorator';

export class FindActorDto {
	@ApiProperty({ required: false, example: 4 })
	@IsOptional()
	@LimitId()
	id: number;

	@ApiProperty({ required: false, example: 'Nicolas' })
	@IsOptional()
	@IsString()
	firstName: string;

	@ApiProperty({ required: false, example: 'Cage' })
	@IsOptional()
	@IsString()
	lastName: string;

	@ApiProperty({ required: false, example: 0 })
	@IsOptional()
	@LimitId()
	skip: number;

	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	take: number;

	@ApiProperty({ required: false, enum: ['asc', 'desc'] })
	@IsOptional()
	@IsString()
	@IsIn(['asc', 'desc'])
	order: Prisma.SortOrder;
}
