import { ApiProperty } from '@nestjs/swagger';

import { ISwaggerErrorExample } from './global-swagger-error.interface';

export class SwaggerErrorRecordNotFound implements ISwaggerErrorExample {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Not Found' })
	error: string;

	@ApiProperty({ example: 'Record with this id was not found!' })
	message: string;
}
