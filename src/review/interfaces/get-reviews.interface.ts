import { Prisma } from '@prisma/client';

export interface GetReviews {
	skip?: number;
	take?: number;
	cursor?: Prisma.ReviewWhereUniqueInput;
	where?: Prisma.ReviewWhereInput;
	orderBy?: Prisma.ReviewOrderByWithRelationInput;
}
