export class RatingSwaggerDoc {
	public static userRatedRecord() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						userRating: {
							id: 2,
							createdAt: '2022-05-22T04:47:22.600Z',
							updatedAt: '2022-05-22T04:47:22.600Z',
							ratingType: 'movie',
							typeId: 2,
							score: 5,
							userId: 3,
						},
					},
				},
			},
		};
	}

	public static findAverageSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						type: 'movie',
						id: 2,
						ratingAverage: 5,
					},
				},
			},
		};
	}

	public static findAverageBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'typeId should not be empty',
						'typeId must be an integer number',
						'ratingType must be one of the following values: movie, actor, review',
						'ratingType should not be empty',
					],
				},
			},
		};
	}

	public static createRatingSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						rating: {
							id: 1,
							createdAt: '2022-05-22T04:47:22.600Z',
							updatedAt: '2022-05-22T04:47:22.600Z',
							ratingType: 'movie',
							typeId: 2,
							score: 5,
							userId: 3,
						},
					},
				},
			},
		};
	}

	public static createRatingBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'This user already rated this record!',
						'typeId should not be empty',
						'typeId must be an integer number',
						'ratingType must be one of the following values: movie, actor, review',
						'ratingType should not be empty',
						'score must not be greater than 5',
						'score must not be less than 1',
						'score must be an integer number',
					],
				},
			},
		};
	}

	public static deleteRatingSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Rating deleted successfully!',
					},
				},
			},
		};
	}
}
