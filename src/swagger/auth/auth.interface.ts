export class AuthSwaggerDoc {
	public static loginSuccess() {
		return {
			'application/json': {
				example: {
					access_token:
						'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3Rpbmc0QGdtYWlsLmNvbSIsImlkIjoxLCJyb2xlIjoidXNlciIsImlhdCI6MTY1MzAyMjA2NywiZXhwIjoxNjUzMTA4NDY3fQ.gNfRoJ9-EsC9BVkvm6s7N8h4OoDSR9hFNrKD_riRVug',
				},
			},
		};
	}

	public static registerSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						user: {
							id: 3,
							createdAt: '2022-05-20T04:56:53.416Z',
							updatedAt: '2022-05-20T04:56:53.427Z',
							username: 'testuser',
							email: 'testing@example.com',
							bio: 'I am pikachu!',
							avatar: 'avatar.jpg',
							role: 'user',
						},
					},
				},
			},
		};
	}

	public static updatePasswordSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Password updated successfully!',
					},
				},
			},
		};
	}

	public static deleteUserSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						message: 'Account deleted successfully!',
					},
				},
			},
		};
	}

	public static updateEmailSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						user: {
							id: 3,
							createdAt: '2022-05-20T04:56:53.416Z',
							updatedAt: '2022-05-20T05:01:01.122Z',
							username: 'testuser',
							email: 'testingUpdate@example.com',
							bio: 'I am pikachu!',
							avatar: 'avatar.jpg',
							role: 'user',
						},
					},
				},
			},
		};
	}

	public static loginBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'username should not be empty',
						'username must be a string',
						'password should not be empty',
						'password must be a string',
					],
				},
			},
		};
	}

	public static changedPassOrMail() {
		return {
			'application/json': {
				example: [
					{
						statusCode: 401,
						error: 'Unauthorized',
						message: 'You have recently changed password or email, please login again!',
					},
					{
						statusCode: 401,
						message: 'Unauthorized',
					},
				],
			},
		};
	}

	public static loginUnauthorized() {
		return {
			'application/json': {
				example: {
					statusCode: 401,
					error: 'Unauthorized',
					message: 'email or password is incorrect!',
				},
			},
		};
	}

	public static updatePasswordBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: ['password must be longer than or equal to 8 characters', 'password must be a string'],
				},
			},
		};
	}

	public static updateEmailBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: ['email should not be empty', 'email must be an email', 'email must be a string'],
				},
			},
		};
	}

	public static noBearerUnauthorized() {
		return {
			'application/json': {
				example: {
					statusCode: 401,
					message: 'Unauthorized',
				},
			},
		};
	}

	public static registerBadRequest() {
		return {
			'application/json': {
				example: {
					statusCode: 400,
					error: 'Bad Request',
					message: [
						'email should not be empty',
						'email must be an email',
						'email must be a string',
						'username should not be empty',
						'username must be a string',
						'password must be longer than or equal to 8 characters',
						'password must be a string',
						'bio should not be empty',
						'bio must be a string',
					],
				},
			},
		};
	}
}
