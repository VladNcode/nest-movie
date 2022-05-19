import { ApiProperty } from '@nestjs/swagger';
import { ErrorDto } from '../auth/auth.controller';

export class ErrorDto2 {
	@ApiProperty({ example: 400 })
	statusCode: number;

	@ApiProperty({ example: 'Bad Request' })
	'error': string;

	@ApiProperty({
		example: [
			'email should not be empty',
			'email must be an email',
			'email must be a string',
			'password must be longer than or equal to 8 characters',
			'password must be a string',
			'bio should not be empty',
			'bio must be a string',
			'username should not be empty',
			'username must be a string',
		],
	})
	message: string[];
}

export const errorForTest = { description: 'asd', type: ErrorDto2, decorator: 'ApiBadRequestResponse' };
