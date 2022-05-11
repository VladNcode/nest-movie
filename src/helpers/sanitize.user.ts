import { User } from '@prisma/client';

export const sanitizeUser = (user: User) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { passwordHash, passwordChangedAt, ...sanitizedUser } = user;

	return sanitizedUser;
};
