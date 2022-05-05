import { Prisma } from '@prisma/client';

export interface GetMovies {
	skip?: number;
	take?: number;
	cursor?: Prisma.MovieWhereUniqueInput;
	where?: Prisma.MovieWhereInput;
	orderBy?: Prisma.MovieOrderByWithRelationInput;
}
