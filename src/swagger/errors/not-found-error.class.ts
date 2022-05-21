import { ApiProperty } from '@nestjs/swagger';

import { ISwaggerErrorExample } from './global-swagger-error.interface';

const err = 'asdasdasdasdasd';
const msg = 'asdasdsdsd';
const code = 404;

export class SwaggerErrorRecordNotFound implements ISwaggerErrorExample {
	@ApiProperty({ example: code })
	statusCode: number;

	@ApiProperty({ example: msg })
	error: string;

	@ApiProperty({ example: err })
	message: string;
}
