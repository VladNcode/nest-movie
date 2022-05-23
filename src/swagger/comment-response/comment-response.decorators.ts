import {
	ApiBadRequestResponse,
	ApiCreatedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiSecurity,
} from '@nestjs/swagger';

import { RecordToDeleteNotFound, RecordToUpdateNotFound } from '../../exports/swagger-errors';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { CommentResponseSwaggerDoc } from './comment-response.class';

export const getCommentResponses = [
	ApiOkResponse({ description: 'Returns comments array', content: CommentResponseSwaggerDoc.getCommentResponses() }),
	...NoBearerOrNeedToRelogin,
];

export const getCommentResponse = [
	ApiOkResponse({ description: 'Returns a comment', content: CommentResponseSwaggerDoc.getCommentResponse() }),
	ApiNotFoundResponse({ description: 'Not Found', content: CommentResponseSwaggerDoc.commentResponseNotFound() }),
	...NoBearerOrNeedToRelogin,
];

export const createCommentResponse = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiCreatedResponse({ description: 'Creates a comment', content: CommentResponseSwaggerDoc.createCommentResponse() }),
	ApiBadRequestResponse({
		description: 'Bad Request',
		content: CommentResponseSwaggerDoc.createCommentResponseBadRequest(),
	}),
	...NoBearerOrNeedToRelogin,
];

export const updateCommentResponse = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({
		description: 'Returns updated comment',
		content: CommentResponseSwaggerDoc.updatedCommentResponse(),
	}),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({
		description: 'Forbidden',
		content: CommentResponseSwaggerDoc.updateCommentResponseForbidden(),
	}),
];

export const deleteCommentResponse = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({
		description: 'Deletes comment record',
		content: CommentResponseSwaggerDoc.getCommentResponseDeletedMessage(),
	}),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToDeleteNotFound }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({
		description: 'Forbidden',
		content: CommentResponseSwaggerDoc.updateCommentResponseForbidden(),
	}),
];
