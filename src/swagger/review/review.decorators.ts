import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiBearerAuth,
} from '@nestjs/swagger';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { ReviewSwaggerDoc } from './review.class';

export const getReviews = [
	ApiOkResponse({ description: 'Returns reviews array', content: ReviewSwaggerDoc.getReviews() }),
];

export const getReview = [
	ApiOkResponse({ description: 'Returns a review', content: ReviewSwaggerDoc.getReview() }),
	ApiNotFoundResponse({ description: 'Not Found', content: ReviewSwaggerDoc.reviewNotFound() }),
];

export const createReview = [
	ApiBearerAuth('access_token'),
	ApiCreatedResponse({ description: 'Creates a review', content: ReviewSwaggerDoc.createReviewSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: ReviewSwaggerDoc.createReviewBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const updateReview = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Updates a review', content: ReviewSwaggerDoc.updateReviewSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: ReviewSwaggerDoc.reviewNotFound() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: ReviewSwaggerDoc.UpdateReviewBadRequest() }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({ description: 'Forbidden', content: ReviewSwaggerDoc.ReviewForbidden() }),
];

export const deleteReview = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Deletes movie record', content: ReviewSwaggerDoc.deleteReviewSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: ReviewSwaggerDoc.reviewNotFound() }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({ description: 'Forbidden', content: ReviewSwaggerDoc.ReviewForbidden() }),
];
