import { Catch, ExceptionFilter, ArgumentsHost, HttpStatus, HttpException, Logger } from '@nestjs/common';
import { PrismaClientKnownRequestError, PrismaClientValidationError } from '@prisma/client/runtime';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exp: any, host: ArgumentsHost) {
		Logger.error('CUSTOM ERROR WAS CATCHED');
		console.log(exp);

		const context = host.switchToHttp();
		const response = context.getResponse<Response>();

		// const request = context.getRequest<Request>();
		// const validErrors = hasKey && Array.isArray(exp.response.message) ? exp.response.message : [];
		// const type = hasKey && exp.response.type ? exp.response.type : 'some_thing_went_error';

		const hasKey = Object.keys(exp).length > 0 && exp.hasOwnProperty('response') ? true : false;
		const isHttpInstance = exp instanceof HttpException ? true : false;
		const error = hasKey ? exp.response.error : exp;
		let statusCode = isHttpInstance ? exp.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		let message = isHttpInstance ? exp.message : 'Oops Something went wrong!';
		message = exp.response?.message || 'Oops Something went wrong!';
		let res;

		if (exp instanceof PrismaClientKnownRequestError) {
			switch (exp.code) {
				case 'P2002': {
					const ratingError = exp.message.match(
						/Unique constraint failed on the fields: \(`user_id`,`rating_type`,`type_id`\)/,
					);

					const likeError = exp.message.match(
						/Unique constraint failed on the fields: \(`user_id`,`like_type`,`type_id`\)/,
					);

					statusCode = 400;

					message = ratingError
						? 'This user already rated this record!'
						: likeError
						? 'This user already liked this record!'
						: `${exp.meta?.target} already exist!`;

					break;
				}
				case 'P2025': {
					message = exp.meta?.cause;
					statusCode = 404;
					break;
				}
			}

			res = {
				statusCode,
				message,
			};

			return response.status(statusCode).json(res);
		}

		if (exp instanceof PrismaClientValidationError) {
			const errorArgument = exp.message.match(/(Argument.*)/g);
			if (errorArgument) {
				message = errorArgument.map(err => err.replace(/for .*\.[a-z]* /, ''));
			}

			const errorUnknownField = exp.message.match(/(Unknown.*)/g);
			if (errorUnknownField) {
				message = errorUnknownField.map(err => err.replace(/ in.*/, ''));
			}

			const res = {
				statusCode: 400,
				message,
			};

			return response.status(statusCode).json(res);
		}

		res = {
			statusCode,
			error,
			message,
		};

		return response.status(statusCode).json(res);
	}
}
