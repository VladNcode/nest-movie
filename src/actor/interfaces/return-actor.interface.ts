import { Actor } from '@prisma/client';

export interface ReturnActor {
	status: string;
	data: { actor: Actor };
}
