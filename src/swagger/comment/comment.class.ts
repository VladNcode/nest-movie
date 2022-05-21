export class CommentSwaggerDoc {
	public static getComment() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						comment: {
							id: 1,
							createdAt: '2022-05-21T06:28:28.229Z',
							updatedAt: '2022-05-21T06:28:28.230Z',
							body: 'Test comment',
							commentType: 'movie',
							typeId: 1,
							userId: 3,
							CommentResponse: [
								{
									userId: 3,
									body: 'Comment response',
								},
								{
									userId: 3,
									body: 'Comment response 2',
								},
							],
						},
					},
				},
			},
		};
	}

	public static getComments() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 2,
						comments: [
							{
								id: 1,
								createdAt: '2022-05-21T06:28:28.229Z',
								updatedAt: '2022-05-21T06:28:28.230Z',
								body: 'Test comment',
								commentType: 'movie',
								typeId: 1,
								userId: 3,
								CommentResponse: [
									{
										userId: 3,
										body: 'Comment response',
									},
									{
										userId: 3,
										body: 'Comment response 2',
									},
								],
							},
							{
								id: 2,
								createdAt: '2022-05-21T06:32:40.856Z',
								updatedAt: '2022-05-21T06:32:40.857Z',
								body: 'Test comment 2',
								commentType: 'movie',
								typeId: 1,
								userId: 3,
								CommentResponse: [
									{
										userId: 3,
										body: 'Comment response',
									},
									{
										userId: 3,
										body: 'Comment response 2',
									},
								],
							},
						],
					},
				},
			},
		};
	}

	public static createComment() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						comment: {
							id: 1,
							createdAt: '2022-05-21T06:32:40.856Z',
							updatedAt: '2022-05-21T06:32:40.857Z',
							body: 'your comment text',
							commentType: 'movie',
							typeId: 1,
							userId: 3,
						},
					},
				},
			},
		};
	}

	public static getCommentDeletedMessage() {
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

	public static commentNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'Comment with this ID does not exist!',
				},
			},
		};
	}

	public static createCommentBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'typeId should not be empty',
						'typeId must be an integer number',
						'commentType must be one of the following values: movie, actor, review',
						'commentType should not be empty',
						'body must be a string',
						'body should not be empty',
					],
				},
			},
		};
	}
}
