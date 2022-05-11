import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetMovies } from './intefaces/get-movies.interface';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getMovie(id: number) {
		return this.prisma.movie.findUnique({
			where: { id },
			include: {
				actors: {
					select: {
						firstName: true,
						lastName: true,
					},
				},
			},
		});
	}

	async getMovies(params: GetMovies): Promise<Movie[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.movie.findMany({ skip, take, cursor, where, orderBy });
	}

	async createMovie(data: Prisma.MovieCreateInput, actors: string[]): Promise<Movie> {
		const { title, description, releaseDate } = data;

		const actorsData = actors.map(actor => ({
			where: { tag: actor },
			create: {
				tag: actor,
				firstName: actor.split(' ')[0],
				lastName: actor.split(' ')[1] || '',
				photo: 'lol.jpg',
			},
		}));

		return this.prisma.movie.create({
			data: {
				title,
				description,
				releaseDate,
				actors: {
					connectOrCreate: actorsData,
				},
			},
		});
	}

	async updateMovie(id: number, data: Prisma.MovieUpdateInput): Promise<Movie> {
		return this.prisma.movie.update({ where: { id }, data });
	}

	async deleteMovie(id: number): Promise<Movie> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'movie' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'movie' }, { typeId: id }] },
		});

		const deletedMovie = this.prisma.movie.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedRatings, deletedMovie]);

		return deletedMovie;
	}
}
