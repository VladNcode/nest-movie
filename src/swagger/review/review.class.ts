export class ReviewSwaggerDoc {
	public static getReviews() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 2,
						reviews: [
							{
								id: 1,
								createdAt: '2022-05-23T05:16:15.855Z',
								updatedAt: '2022-05-23T05:16:15.867Z',
								body: 'Fantastic!',
								userId: 3,
								movieId: 5,
							},
							{
								id: 2,
								createdAt: '2022-05-23T05:16:38.517Z',
								updatedAt: '2022-05-23T05:16:38.518Z',
								body: 'Excelsior!',
								userId: 3,
								movieId: 2,
							},
						],
					},
				},
			},
		};
	}

	public static getReview() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						review: {
							id: 2,
							createdAt: '2022-05-23T05:16:38.517Z',
							updatedAt: '2022-05-23T05:16:38.518Z',
							body: 'Excelsior!',
							userId: 3,
							movieId: 2,
						},
					},
				},
			},
		};
	}

	public static reviewNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'Review with this ID does not exist!',
				},
			},
		};
	}

	public static createReviewSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						review: {
							id: 1,
							createdAt: '2022-05-23T05:35:51.371Z',
							updatedAt: '2022-05-23T05:35:51.372Z',
							body: 'Amazing!',
							userId: 3,
							movieId: 2,
						},
					},
				},
			},
		};
	}

	public static createReviewBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'This user already reviewed this movie!',
						'body should not be empty',
						'body must be a string',
						'movieId should not be empty',
						'movieId must be an integer number',
					],
				},
			},
		};
	}

	public static ReviewForbidden() {
		return {
			'application/json': {
				example: {
					statusCode: 403,
					error: 'Forbidden',
					message: 'This review does not belong to the current user!',
				},
			},
		};
	}

	public static updateReviewSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						review: {
							id: 2,
							createdAt: '2022-05-23T05:16:38.517Z',
							updatedAt: '2022-05-23T05:33:14.345Z',
							body: 'Excelsior!',
							userId: 3,
							movieId: 2,
						},
					},
				},
			},
		};
	}

	public static UpdateReviewBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: ['body should not be empty', 'body must be a string'],
				},
			},
		};
	}

	public static deleteReviewSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Review deleted successfully!',
					},
				},
			},
		};
	}
}
