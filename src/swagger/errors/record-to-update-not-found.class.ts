import { ApiProperty } from '@nestjs/swagger';

import { SwaggerErrors } from '../swagger-error.constants';
import { ISwaggerErrorExample } from './global-swagger-error.interface';

export class RecordToUpdateNotFound implements ISwaggerErrorExample {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Not Found' })
	error: string;

	@ApiProperty({
		example: 'Record to update not found.',
	})
	message: string;
}

export const recordToUpdateNotFound = {
	description: 'Not Found',
	type: RecordToUpdateNotFound,
	decorator: SwaggerErrors.ApiNotFoundResponse,
};
