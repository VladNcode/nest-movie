import { Review } from '@prisma/client';

export interface ReturnUpdatedReview {
	status: string;
	review?: Review;
	message?: string;
}
