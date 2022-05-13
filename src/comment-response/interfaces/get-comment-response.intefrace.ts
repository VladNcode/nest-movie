import { Prisma } from '@prisma/client';

export interface GetCommentResponse {
	skip?: number;
	take?: number;
	cursor?: Prisma.CommentResponseWhereUniqueInput;
	where?: Prisma.CommentResponseWhereInput;
	orderBy?: Prisma.CommentResponseOrderByWithRelationInput;
}
