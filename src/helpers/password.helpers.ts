import { genSalt, hash } from 'bcrypt';

export class Passwords {
	public static async hashPassword(password: string) {
		const salt = await genSalt(12);
		const passwordHash = await hash(password, salt);

		return passwordHash;
	}
}
