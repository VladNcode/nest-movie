export class CommentResponseSwaggerDoc {
	public static getCommentResponse() {
		return {
			'application/json': {
				example: {
					status: 'success',
					comment: {
						id: 1,
						createdAt: '2022-05-13T09:27:43.698Z',
						updatedAt: '2022-05-13T09:27:43.699Z',
						body: 'comment response',
						commentId: 3,
						userId: 18,
					},
				},
			},
		};
	}

	public static getCommentResponses() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 4,
						comments: [
							{
								id: 1,
								createdAt: '2022-05-21T06:33:53.925Z',
								updatedAt: '2022-05-21T06:33:53.925Z',
								body: 'Comment response',
								commentId: 1,
								userId: 3,
							},
							{
								id: 2,
								createdAt: '2022-05-21T06:34:21.884Z',
								updatedAt: '2022-05-21T06:34:21.885Z',
								body: 'Comment response 2',
								commentId: 2,
								userId: 3,
							},
						],
					},
				},
			},
		};
	}

	public static createCommentResponse() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						comment: {
							id: 4,
							createdAt: '2022-05-21T06:34:21.884Z',
							updatedAt: '2022-05-21T06:34:21.885Z',
							body: 'Comment response',
							commentId: 2,
							userId: 3,
						},
					},
				},
			},
		};
	}

	public static getCommentResponseDeletedMessage() {
		return {
			'application/json': {
				example: {
					status: 'success',
					message: 'This comment has been deleted!',
				},
			},
		};
	}

	public static commentResponseNotFound() {
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

	public static updateCommentResponseBadRequest() {
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

	public static createCommentResponseBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'commentId should not be empty',
						'commentId must be an integer number',
						'body must be a string',
						'body should not be empty',
					],
				},
			},
		};
	}

	public static updateCommentResponseForbidden() {
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

	public static updatedCommentResponse() {
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
