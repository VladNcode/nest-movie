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
							commentResponses: [
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
								commentResponses: [
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
					message: 'This comment has been deleted!',
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

	public static updateCommentBadRequest() {
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

	public static updateCommentForbidden() {
		return {
			'application/json': {
				example: {
					statusCode: 403,
					error: 'Forbidden',
					message: 'This comment does not belong to current user!',
				},
			},
		};
	}

	public static updatedComment() {
		return {
			'application/json': {
				example: {
					status: 'success',
					comment: {
						id: 1,
						createdAt: '2022-05-13T09:27:43.698Z',
						updatedAt: '2022-05-13T09:27:43.699Z',
						body: 'Update comment text',
						commentId: 3,
						userId: 18,
					},
				},
			},
		};
	}
}
