import {
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiUnauthorizedResponse,
	ApiResponse,
	ApiSecurity,
} from '@nestjs/swagger';

import { AuthSwaggerDoc } from './auth.class';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';

export const updateEmail = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns an updated user', content: AuthSwaggerDoc.updateEmailSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.updateEmailBadRequest() }),
	...NoBearerOrNeedToRelogin,
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
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns success message', content: AuthSwaggerDoc.updatePasswordSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: AuthSwaggerDoc.updatePasswordBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const deleteMe = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns success message', content: AuthSwaggerDoc.deleteUserSuccess() }),
	...NoBearerOrNeedToRelogin,
];
