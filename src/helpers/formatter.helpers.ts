import { Actor, Movie, User } from '@prisma/client';

export type ResponseType = <T extends object>(data: T) => { status: string; data: T };

class FormattedReturn {
	response: ResponseType = data => {
		return { status: 'success', data };
	};

	sanitizeUser(user: User) {
		const { id, createdAt, updatedAt, username, email, bio, avatar, role } = user;

		return this.response({
			user: { id, createdAt, updatedAt, username, email, bio, avatar, role },
		});
	}

	moviesWithActors(movies: (Movie & { actors: Pick<Actor, 'firstName' | 'lastName'>[] })[]) {
		const formattedMovies = movies.map(movie => {
			const { actors, ...noActorsMovie } = movie;
			const actorsArray = [];

			for (const { firstName, lastName } of actors) {
				actorsArray.push(`${firstName} ${lastName}`);
			}

			return { ...noActorsMovie, actors: actorsArray };
		});

		return this.response({ results: movies.length, movies: formattedMovies });
	}

	movieWithActors(movie: Movie & { actors: Pick<Actor, 'firstName' | 'lastName'>[] }) {
		const { actors, ...noActorsMovie } = movie;

		const actorsArray = [];

		for (const { firstName, lastName } of actors) {
			actorsArray.push(`${firstName} ${lastName}`);
		}

		return this.response({ movie: { ...noActorsMovie, actors: actorsArray } });
	}
}

export const Formatted: FormattedReturn = new FormattedReturn();
