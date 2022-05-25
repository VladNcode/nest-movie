export const LOGIN_OR_PASSWORD_WAS_CHANGED = 'You have recently changed password or email, please login again!';
export const PASSWORD_UPDATED_SUCCESSFULLY = 'Password updated successfully!';
export const ACCOUNT_DELETED_SUCCESSFULLY = 'Account deleted successfully!';
export const USER_NOT_FOUND = 'User not found!';
export const USER_ALREADY_EXIST = 'User already exists!';
export const EXPIRES_IN_10_MINUTES = (): Date => new Date(Date.now() + 10 * 60 * 1000);
export const PASSWORD_RESET_TOKEN_WAS_SENT =
	'Your password reset token was sent to your email! It is only available for 10 minutes!';
