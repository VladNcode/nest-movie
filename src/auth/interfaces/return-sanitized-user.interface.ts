import { SanitizedUser } from '../../exports/interfaces';

export interface ReturnSanitizedUser {
	status: string;
	data: {
		user: SanitizedUser;
	};
}
