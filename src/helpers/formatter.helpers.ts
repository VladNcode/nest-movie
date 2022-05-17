import { User } from '@prisma/client';

type Response = <T extends object>(data: T) => { status: string; data: T };

class FormattedReturn {
	response: Response = data => {
		return { status: 'success', data };
	};

	sanitizeUser(user: User) {
		const { id, createdAt, updatedAt, username, email, bio, avatar, role } = user;

		return this.response({
			user: { id, createdAt, updatedAt, username, email, bio, avatar, role },
		});
	}
}

export const Formatted: FormattedReturn = new FormattedReturn();