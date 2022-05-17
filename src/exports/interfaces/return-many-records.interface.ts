// export interface ReturnManyRecords<T> {
// 	status: string;
// 	data: { results: number; data: T[] };
// }

import { Actor, Comment } from '@prisma/client';

export interface ReturnManyRecords {
	status: string;
	data: object;
}

export interface ReturnActors extends ReturnManyRecords {
	data: { results: number; actors: Actor[] };
}

export interface ReturnComments extends ReturnManyRecords {
	data: { results: number; comments: Comment[] };
}
