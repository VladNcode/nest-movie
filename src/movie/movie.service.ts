import { Injectable } from '@nestjs/common';
import { Movie, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

import { ActorsFirstAndLastName } from 'src/exports/interfaces';

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getMovie(id: Movie['id']): Promise<(Movie & ActorsFirstAndLastName) | null> {
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

	async getMovies(params: Prisma.MovieFindManyArgs): Promise<(Movie & ActorsFirstAndLastName)[]> {
		const { skip, take, cursor, where, orderBy } = params;
		return this.prisma.movie.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
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

	async createMovie(data: Prisma.MovieCreateInput, actors: string[]): Promise<Movie & ActorsFirstAndLastName> {
		const { title, description, releaseDate } = data;

		const actorsData = actors.map(actor => ({
			where: { tag: actor },
			create: {
				tag: actor,
				firstName: actor.split(' ')[0],
				lastName: actor.split(' ')[1] || '',
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

	/**
	 * If data contains actors param we are are getting the movie by id to compare its actors to provided actors
	 * After that we disconnect actors that wasn't provided but existed in current movie
	 * And also create/connect provided actors
	 * @param data
	 * @returns
	 */
	async updateMovie(data: {
		id: Movie['id'];
		body: Prisma.MovieUpdateInput & { actors?: string[] };
	}): Promise<Movie & ActorsFirstAndLastName> {
		const {
			id,
			body: { actors, ...movie },
		} = data;

		if (actors) {
			await this.updateActorsInMovie(id, actors);
		}

		return this.prisma.movie.update({
			where: { id },
			data: {
				...movie,
			},
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

	private async updateActorsInMovie(id: number, actors: string[]) {
		const existingMovie = await this.getMovie(id);
		const actorTags = existingMovie?.actors.map(
			({ firstName, lastName }) => `${firstName}${lastName ? ' ' + lastName : ''}`,
		);

		const tagsToRemove = actorTags?.filter(actor => !actors.includes(actor)).map(actorTag => ({ tag: actorTag }));

		const actorsData = actors.map(actor => ({
			where: { tag: actor },
			create: {
				tag: actor,
				firstName: actor.split(' ')[0],
				lastName: actor.split(' ')[1] || '',
			},
		}));

		return this.prisma.movie.update({
			where: { id },
			data: {
				actors: {
					disconnect: tagsToRemove,
					connectOrCreate: actorsData,
				},
			},
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

	/**
	 * Since our database uses ENUMs and has no direct refs, run a transaction
	 * to delete: likes, ratings and comments which are related to the movie
	 * @param id - the movie id
	 * @returns deleted movie
	 */
	async deleteMovie(id: Movie['id']): Promise<Movie> {
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
