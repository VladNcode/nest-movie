export class ActorSwaggerDoc {
	public static getActor() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						actor: {
							id: 4,
							createdAt: '2022-05-19T07:36:00.591Z',
							updatedAt: '2022-05-19T12:03:32.261Z',
							tag: 'Nicolas Cage',
							firstName: 'Nicolas',
							lastName: 'Cage',
							photo: 'http://localhost:3000/2022-05-19/nicolas-cage.png',
						},
					},
				},
			},
		};
	}

	public static getActors() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 2,
						actors: [
							{
								id: 3,
								createdAt: '2022-05-19T07:35:48.061Z',
								updatedAt: '2022-05-19T07:35:48.072Z',
								tag: 'Ryan Reynolds',
								firstName: 'Ryan',
								lastName: 'Reynolds',
								photo: 'http://localhost:3000/2022-05-19/ryan-reynolds.png',
							},
							{
								id: 4,
								createdAt: '2022-05-19T07:36:00.591Z',
								updatedAt: '2022-05-19T12:03:32.261Z',
								tag: 'Nicolas Cage',
								firstName: 'Nicolas',
								lastName: 'Cage',
								photo: 'http://localhost:3000/2022-05-19/nicolas-cage.png',
							},
						],
					},
				},
			},
		};
	}

	public static getActorDeletedMessage() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Actor deleted successfully!',
					},
				},
			},
		};
	}

	public static actorNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'Actor with this ID not found',
				},
			},
		};
	}

	public static createActorBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'tag already exist!',
						'tag should not be empty',
						'tag must be a string',
						'firstName should not be empty',
						'firstName must be a string',
						'lastName should not be empty',
						'lastName must be a string',
					],
				},
			},
		};
	}
}
