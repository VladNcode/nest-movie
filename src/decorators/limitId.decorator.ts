import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { Max, IsInt } from 'class-validator';

export function LimitId() {
	return applyDecorators(...[Max(999999999999999), Transform(({ value }) => parseInt(value)), IsInt()]);
}
