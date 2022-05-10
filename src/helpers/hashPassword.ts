import { genSalt, hash } from 'bcrypt';

export const hashPassword = async function (password: string) {
	const salt = await genSalt(12);
	const passwordHash = await hash(password, salt);

	return passwordHash;
};
