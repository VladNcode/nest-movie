import { ApiProperty } from '@nestjs/swagger';

import { ISwaggerErrorExample } from './global-swagger-error.interface';

export class RecordToDeleteNotFound implements ISwaggerErrorExample {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Not Found' })
	error: string;

	@ApiProperty({
		example: 'Record to delete does not exist.',
	})
	message: string;
}
