import { Prisma } from '@prisma/client';

export interface GetComments {
	skip?: number;
	take?: number;
	cursor?: Prisma.CommentWhereUniqueInput;
	where?: Prisma.CommentWhereInput;
	orderBy?: Prisma.CommentOrderByWithRelationInput;
}
