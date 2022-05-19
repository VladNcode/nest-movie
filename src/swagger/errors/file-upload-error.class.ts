import { ApiProperty } from '@nestjs/swagger';
import { SwaggerErrors } from '../swagger-error.constants';
import { ISwaggerErrorExample } from './global-swagger-error.interface';

export class FileUploadError implements ISwaggerErrorExample {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Not Found' })
	error: string;

	@ApiProperty({
		example: 'You need to upload a file!',
	})
	message: string;
}

export const fileUploadError = {
	description: 'Not Found',
	type: FileUploadError,
	decorator: SwaggerErrors.ApiNotFoundResponse,
};
