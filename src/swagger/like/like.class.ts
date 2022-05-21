export class LikeSwaggerDoc {
	public static userLikedAlready() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						userLiked: 'boolean',
					},
				},
			},
		};
	}

	public static LikeBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'typeId must be an integer number',
						'typeId should not be empty',
						'likeType must be one of the following values: movie, actor, review, comment, commentResponse',
						'likeType should not be empty',
					],
				},
			},
		};
	}

	public static getLikeCount() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						type: 'movie',
						id: 1,
						likeCount: 1,
					},
				},
			},
		};
	}
	public static createLikeSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						like: {
							id: 4,
							createdAt: '2022-05-21T08:25:04.021Z',
							likeType: 'movie',
							typeId: 1,
							userId: 3,
						},
					},
				},
			},
		};
	}
	public static RecordNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'Record with this id was not found!',
				},
			},
		};
	}
	public static createLikeBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'This user already liked this record!',
						'typeId must be an integer number',
						'typeId should not be empty',
						'likeType must be one of the following values: movie, actor, review, comment, commentResponse',
						'likeType should not be empty',
					],
				},
			},
		};
	}
	public static deleteLikeMessage() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Like was deleted successfully!',
					},
				},
			},
		};
	}
	public static deleteLikeBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'User have not likes this record!',
						'typeId must be an integer number',
						'typeId should not be empty',
						'likeType must be one of the following values: movie, actor, review, comment, commentResponse',
						'likeType should not be empty',
					],
				},
			},
		};
	}
}
