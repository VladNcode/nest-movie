import { Injectable } from '@nestjs/common';
import { Movie, MovieAndActor, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async createMovie(data: Prisma.MovieCreateInput): Promise<Movie> {
		return this.prisma.movie.create({
			data,
		});
	}

	//TODO CREATE MoviesAndActors SERVICE
	async fillMoviesAndActors(data: Prisma.MovieAndActorCreateInput): Promise<MovieAndActor> {
		return this.prisma.movieAndActor.create({ data });
	}
}
