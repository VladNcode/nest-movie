import { applyDecorators } from '@nestjs/common';
import { ApiResponse, ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { SwaggerErrors } from '../swagger/swagger-error.constants';

interface SwaggerErrorDecorator {
	description: string;
	type: any;
	decorator: string;
}

export function SwaggerDecorator(data: SwaggerErrorDecorator[], def: any) {
	const dec = data.map(dec => {
		switch (dec.decorator) {
			case SwaggerErrors.ApiBadRequestResponse: {
				return ApiBadRequestResponse({ description: dec.description, type: dec.type });
			}
			case SwaggerErrors.ApiNotFoundResponse: {
				return ApiNotFoundResponse({ description: dec.description, type: dec.type });
			}
		}
	}) as MethodDecorator & ClassDecorator[];

	return applyDecorators(ApiResponse(def), ...dec);
}
