export class UserSwaggerDoc {
	public static getUsers() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						results: 3,
						users: [
							{
								id: 1,
								createdAt: '2022-05-16T12:23:25.723Z',
								updatedAt: '2022-05-17T16:13:39.141Z',
								username: 'Bulbasaur',
								email: 'bulbasaur@example.com',
								bio: 'Bulb!',
								avatar: 'avatar.jpg',
								role: 'user',
							},
							{
								id: 2,
								createdAt: '2022-05-20T04:56:53.416Z',
								updatedAt: '2022-05-20T11:34:10.104Z',
								username: 'Pikachu',
								email: 'pikachu@example.com',
								bio: 'I am pikachu!',
								avatar: 'avatar.jpg',
								role: 'user',
							},
						],
					},
				},
			},
		};
	}

	public static getUser() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						user: {
							id: 2,
							createdAt: '2022-05-20T04:56:53.416Z',
							updatedAt: '2022-05-20T11:34:10.104Z',
							username: 'Pikachu',
							email: 'pikachu@example.com',
							bio: 'I am pikachu!',
							avatar: 'avatar.jpg',
							role: 'user',
						},
					},
				},
			},
		};
	}

	public static userNotFound() {
		return {
			'application/json': {
				example: {
					statusCode: 404,
					error: 'Not Found',
					message: 'User not found!',
				},
			},
		};
	}

	public static updateUserSuccess() {
		return {
			'application/json': {
				example: {
					status: 'success',
					data: {
						user: {
							id: 2,
							createdAt: '2022-05-20T04:56:53.416Z',
							updatedAt: '2022-05-20T11:34:10.104Z',
							username: 'Pikachu',
							email: 'pikachu@example.com',
							bio: 'I am the greatest pikachu!',
							avatar: 'avatar.jpg',
							role: 'user',
						},
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
						message: 'User successfully deleted!',
					},
				},
			},
		};
	}
}
