export class MovieSwaggerDoc {
	public static getMovie() {
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

	public static createdMovieSuccess() {
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
}
