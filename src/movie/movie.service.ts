import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getMovie(id: number): Promise<Movie | null> {
		return this.prisma.movie.findUnique({ where: { id } });
	}

	async getMovies(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.MovieWhereUniqueInput;
		where?: Prisma.MovieWhereInput;
		orderBy?: Prisma.MovieOrderByWithRelationInput;
	}): Promise<Movie[]> {
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
