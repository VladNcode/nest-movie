import {
	ApiBearerAuth,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiResponse,
} from '@nestjs/swagger';
import { BEARER_IS_MISSING_OR_NEED_TO_RELOGIN } from '../../auth/auth.constants';
import { AuthSwaggerDoc } from './auth.interface';

export const updateEmail = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns an updated user', content: AuthSwaggerDoc.updateEmailSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.updateEmailBadRequest() }),
	ApiUnauthorizedResponse(BEARER_IS_MISSING_OR_NEED_TO_RELOGIN),
];

export const login = [
	ApiOkResponse({ description: 'Returns JWT token', content: AuthSwaggerDoc.loginSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.loginBadRequest() }),
	ApiUnauthorizedResponse({ description: 'Unauthorized', content: AuthSwaggerDoc.loginUnauthorized() }),
];

export const register = [
	ApiResponse({ status: 201, description: 'Returns registered user', content: AuthSwaggerDoc.registerSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.registerBadRequest() }),
];

export const updatePassword = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns success message', content: AuthSwaggerDoc.updatePasswordSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.updatePasswordBadRequest() }),
	ApiUnauthorizedResponse(BEARER_IS_MISSING_OR_NEED_TO_RELOGIN),
];

export const deleteMe = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns success message', content: AuthSwaggerDoc.deleteUserSuccess() }),
	ApiUnauthorizedResponse(BEARER_IS_MISSING_OR_NEED_TO_RELOGIN),
];
