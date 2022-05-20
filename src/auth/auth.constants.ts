import { AuthSwaggerDoc } from '../swagger/auth/auth.interface';

export const LOGIN_OR_PASSWORD_WAS_CHANGED = 'You have recently changed password or email, please login again!';
export const PASSWORD_UPDATED_SUCCESSFULLY = 'Password updated successfully!';
export const ACCOUNT_DELETED_SUCCESSFULLY = 'Account deleted successfully!';

export const BEARER_IS_MISSING_OR_NEED_TO_RELOGIN = {
	description: 'Bearer is missing or you have recently changed email or password and need to re-login',
	content: AuthSwaggerDoc.changedPassOrMail(),
};
