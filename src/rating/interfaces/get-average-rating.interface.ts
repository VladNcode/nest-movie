import { RatingType } from '@prisma/client';

export interface GetAverageRating {
	status: string;
	data: {
		type: RatingType;
		id: number;
		ratingAverage: number;
	};
}
