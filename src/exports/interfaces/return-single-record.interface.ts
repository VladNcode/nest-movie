import { Actor, Comment } from '@prisma/client';

export interface ReturnSingleRecord {
	status: string;
	data: object;
}

export interface ReturnActor extends ReturnSingleRecord {
	data: { actor: Actor };
}

export interface ReturnComment extends ReturnSingleRecord {
	data: { comment: Comment };
}

// export interface ReturnSingleRecord<Record extends string, T> {
// 	status: string;
// 	data: { [key in Record]: T };
// }

// import { ResponseType } from '../../helpers/formatter.helpers';

// export interface ReturnSingleRecord extends ReturnType<ResponseType> {
// 	a?: string;
// }
