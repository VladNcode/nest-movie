import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsIn, IsOptional, IsString } from 'class-validator';
import { LimitId } from '../../decorators/limitId.decorator';

export class FindMovieDto {
	@ApiProperty({ required: false, example: 1 })
	@IsOptional()
	@LimitId()
	id: number;

	@ApiProperty({ required: false, example: "Willy's Wonderland" })
	@IsOptional()
	@IsString()
	title: string;

	@ApiProperty({ required: false, example: 1 })
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
