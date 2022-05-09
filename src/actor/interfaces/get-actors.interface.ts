import { Prisma } from '@prisma/client';

export interface GetActors {
	skip?: number;
	take?: number;
	cursor?: Prisma.ActorWhereUniqueInput;
	where?: Prisma.ActorWhereInput;
	orderBy?: Prisma.ActorOrderByWithRelationInput;
}
