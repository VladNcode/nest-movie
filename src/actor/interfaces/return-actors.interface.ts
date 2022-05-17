import { Actor } from '@prisma/client';

export interface ReturnActors {
	status: string;
	data: {
		results: number;
		actors: Actor[];
	};
}
