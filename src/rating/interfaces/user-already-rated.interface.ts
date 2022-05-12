import { Rating } from '@prisma/client';

export interface UserAlreadyRated {
	status: string;
	message?: string;
	userRating?: Rating;
}
