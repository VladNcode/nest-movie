import { ApiProperty } from '@nestjs/swagger';
import { ISwaggerErrorExample } from '../errors/global-swagger-error.interface';
import { SwaggerErrors } from '../swagger-error.constants';

export class CreateActorError implements ISwaggerErrorExample {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: 'Bad Request' })
	error: string;

	@ApiProperty({
		example: [
			'tag already exist!',
			'tag should not be empty',
			'tag must be a string',
			'firstName should not be empty',
			'firstName must be a string',
			'lastName should not be empty',
			'lastName must be a string',
		],
	})
	message: string[];
}

export class ActorNotFound implements ISwaggerErrorExample {
	@ApiProperty({ example: 404 })
	statusCode: number;

	@ApiProperty({ example: 'Not Found' })
	error: string;

	@ApiProperty({
		example: 'Actor with this ID not found',
	})
	message: string;
}

export const actorNotFound = {
	description: 'Not Found',
	type: ActorNotFound,
	decorator: SwaggerErrors.ApiNotFoundResponse,
};

export const createActorBadRequest = {
	description: 'Bad Request',
	type: CreateActorError,
	decorator: SwaggerErrors.ApiBadRequestResponse,
};
