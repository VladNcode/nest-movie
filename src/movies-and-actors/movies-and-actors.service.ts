import { Injectable } from '@nestjs/common';
import { MovieAndActor, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MoviesAndActorsService {
	constructor(private prisma: PrismaService) {}

	async findActorsInMovie(id: number) {
		return this.prisma.movieAndActor.findMany({
			where: { movieId: id },
			select: {
				Actor: { select: { firstName: true, lastName: true } },
			},
		});
	}

	async fillMoviesAndActors(data: Prisma.MovieAndActorCreateInput): Promise<MovieAndActor> {
		return this.prisma.movieAndActor.create({ data });
	}

	async cleanUpMoviesAndActors(id: number): Promise<Prisma.BatchPayload> {
		return this.prisma.movieAndActor.deleteMany({ where: { movieId: id } });
	}
}
