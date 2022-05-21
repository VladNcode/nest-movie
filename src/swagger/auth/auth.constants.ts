import { AuthSwaggerDoc } from './auth.class';

export const NEED_TO_RELOGIN = {
	description: 'You have recently changed email or password and need to re-login',
	content: AuthSwaggerDoc.changedPassOrMail(),
};

export const NO_BEARER = { description: 'No bearer token', content: AuthSwaggerDoc.noBearer() };
