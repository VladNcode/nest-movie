import { genSalt, hash } from 'bcrypt';
import { createHash } from 'crypto';

export class Passwords {
	public static async hashPassword(password: string): Promise<string> {
		const salt = await genSalt(12);
		const passwordHash = await hash(password, salt);

		return passwordHash;
	}

	public static createToken(token: string): string {
		return createHash('sha256').update(token).digest('hex');
	}
}
