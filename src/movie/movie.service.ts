import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { ActorsFirstAndLastName } from 'src/exports/interfaces';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getMovie(id: number): Promise<(Movie & ActorsFirstAndLastName) | null> {
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

	async getMovies(params: Prisma.MovieFindManyArgs): Promise<Movie[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.movie.findMany({ skip, take, cursor, where, orderBy });
	}

	async createMovie(data: Prisma.MovieCreateInput, actors: string[]) {
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
				posters: ['movie_poster.jpg'],
				actors: {
					connectOrCreate: actorsData,
				},
			},
		});
	}

	async updateMovie(id: Movie['id'], data: Prisma.MovieUpdateInput): Promise<Movie> {
		return this.prisma.movie.update({ where: { id }, data });
	}

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete: likes, ratings and comments which are related to the movie
	 * @param id - the movie id
	 * @returns deleted movie
	 */
	async deleteMovie(id: number): Promise<Movie> {
		const deletedLikes = this.prisma.like.deleteMany({
			where: { AND: [{ likeType: 'movie' }, { typeId: id }] },
		});

		const deletedRatings = this.prisma.rating.deleteMany({
			where: { AND: [{ ratingType: 'movie' }, { typeId: id }] },
		});

		const deleteComments = this.prisma.comment.deleteMany({
			where: { AND: [{ commentType: 'movie' }, { typeId: id }] },
		});

		const deletedMovie = this.prisma.movie.delete({ where: { id } });

		await this.prisma.$transaction([deletedLikes, deletedRatings, deleteComments, deletedMovie]);

		return deletedMovie;
	}
}
