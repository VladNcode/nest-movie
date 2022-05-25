import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';

import { RecordToDeleteNotFound, RecordToUpdateNotFound } from '../../exports/swagger-errors';
import { SwaggerErrorRecordNotFound } from '../errors/not-found-error.class';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { RatingSwaggerDoc } from './rating.class';

export const getUserRating = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns user rating or null', content: RatingSwaggerDoc.userRatedRecord() }),
	ApiNotFoundResponse({ description: 'Not Found', type: SwaggerErrorRecordNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const getAverage = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns average rating', content: RatingSwaggerDoc.findAverageSuccess() }),
	ApiBadRequestResponse({ description: 'Bad request', content: RatingSwaggerDoc.findAverageBadRequest() }),
	ApiNotFoundResponse({ description: 'Not Found', type: SwaggerErrorRecordNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const createRating = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns created rating', content: RatingSwaggerDoc.createRatingSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: RatingSwaggerDoc.createRatingBadRequest() }),
	ApiNotFoundResponse({ description: 'Not Found', type: SwaggerErrorRecordNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const updateRating = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns created rating', content: RatingSwaggerDoc.createRatingSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: RatingSwaggerDoc.createRatingBadRequest() }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const deleteRating = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Deletes rating record', content: RatingSwaggerDoc.deleteRatingSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToDeleteNotFound }),
	...NoBearerOrNeedToRelogin,
];
