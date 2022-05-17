import { Role } from '@prisma/client';

export interface SanitizedUser {
	id: number;
	createdAt: Date;
	updatedAt: Date;
	username: string;
	email: string;
	bio: string;
	avatar: string;
	role: Role;
}
