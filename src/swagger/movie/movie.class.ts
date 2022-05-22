export class MovieSwaggerDoc {
	public static getMovie() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						movie: {
							id: 1,
							title: 'Jaws',
							createdAt: '2022-05-21T09:29:27.757Z',
							updatedAt: '2022-05-21T11:04:13.854Z',
							description:
								"When a killer shark unleashes chaos on a beach community off Long Island, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
							posters: ['movie_poster.jpg'],
							releaseDate: '1975-06-20T00:00:00.000Z',
							actors: ['Roy Scheider', 'Robert Shaw', 'Richard Dreyfuss', 'Lorraine Gary'],
						},
					},
				},
			},
		};
	}

	public static movieNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'Movie with this ID not found',
				},
			},
		};
	}

	public static updateMovieSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						movie: {
							id: 1,
							title: 'updated title',
							createdAt: '2022-05-21T09:29:27.757Z',
							updatedAt: '2022-05-21T11:04:13.854Z',
							description: 'updated description',
							posters: ['movie_poster.jpg'],
							releaseDate: '2021-03-12T00:00:00.000Z',
							actors: ['Nicolas Cage', 'Emily Tosta', 'Beth Grant'],
						},
					},
				},
			},
		};
	}

	public static getMovies() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 2,
						movies: [
							{
								id: 1,
								title: "Willy's Wonderland",
								createdAt: '2022-05-21T09:15:16.921Z',
								updatedAt: '2022-05-21T09:15:16.923Z',
								description:
									"A quiet drifter is tricked into a janitorial job at the now condemned Willy's Wonderland. The mundane tasks suddenly become an all-out fight for survival against wave after wave of demonic animatronics. Fists fly, kicks land, titans clash -- and only one side will make it out alive.",
								posters: ['movie_poster.jpg'],
								releaseDate: '2021-02-12T00:00:00.000Z',
								actors: ['Nicolas Cage', 'Emily Tosta', 'Beth Grant'],
							},
							{
								id: 2,
								title: 'Jaws',
								createdAt: '2022-05-21T09:29:27.757Z',
								updatedAt: '2022-05-21T11:04:13.854Z',
								description:
									"When a killer shark unleashes chaos on a beach community off Long Island, it's up to a local sheriff, a marine biologist, and an old seafarer to hunt the beast down.",
								posters: ['movie_poster.jpg'],
								releaseDate: '1975-06-20T00:00:00.000Z',
								actors: ['Roy Scheider', 'Robert Shaw', 'Richard Dreyfuss', 'Lorraine Gary'],
							},
						],
					},
				},
			},
		};
	}

	public static createMovieSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						movie: {
							id: 2,
							title: "Willy's Wonderland",
							createdAt: '2022-05-21T09:15:16.921Z',
							updatedAt: '2022-05-21T09:15:16.923Z',
							description:
								"A quiet drifter is tricked into a janitorial job at the now condemned Willy's Wonderland. The mundane tasks suddenly become an all-out fight for survival against wave after wave of demonic animatronics. Fists fly, kicks land, titans clash -- and only one side will make it out alive.",
							posters: ['movie_poster.jpg'],
							releaseDate: '2021-02-12T00:00:00.000Z',
							actors: ['Nicolas Cage', 'Emily Tosta', 'Beth Grant'],
						},
					},
				},
			},
		};
	}

	public static createMovieBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'title should not be empty',
						'title must be a string',
						'description should not be empty',
						'description must be a string',
						'releaseDate must be formatted as yyyy-mm-dd',
						'each value in actors should not be empty',
						'actors should not be empty',
						'actors must be an array',
					],
				},
			},
		};
	}

	public static deleteMovieSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Movie was deleted successfully!',
					},
				},
			},
		};
	}
}
