import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetMovies } from './intefaces/get-movies.interface';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getMovie(id: number): Promise<Movie | null> {
		return this.prisma.movie.findUnique({ where: { id } });
	}

	async getMovies(params: GetMovies): Promise<Movie[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.movie.findMany({ skip, take, cursor, where, orderBy });
	}

	async createMovie(data: Prisma.MovieCreateInput): Promise<Movie> {
		return this.prisma.movie.create({
			data,
		});
	}

	async updateMovie(id: number, data: Prisma.MovieUpdateInput): Promise<Movie> {
		return this.prisma.movie.update({ where: { id }, data });
	}

	async deleteMovie(id: number): Promise<Movie> {
		return this.prisma.movie.delete({ where: { id } });
	}
}
