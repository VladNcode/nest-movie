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
import { CommentSwaggerDoc } from './comment.class';

export const getComments = [
	ApiOkResponse({ description: 'Returns comments array', content: CommentSwaggerDoc.getComments() }),
	...NoBearerOrNeedToRelogin,
];

export const getComment = [
	ApiOkResponse({ description: 'Returns a comment', content: CommentSwaggerDoc.getComment() }),
	ApiNotFoundResponse({ description: 'Not Found', content: CommentSwaggerDoc.commentNotFound() }),
	...NoBearerOrNeedToRelogin,
];

export const createComment = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiCreatedResponse({ description: 'Creates a comment', content: CommentSwaggerDoc.createComment() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: CommentSwaggerDoc.createCommentBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const updateComment = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns updated comment', content: CommentSwaggerDoc.updatedComment() }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({ description: 'Forbidden', content: CommentSwaggerDoc.updateCommentForbidden() }),
];

export const deleteComment = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Deletes comment record', content: CommentSwaggerDoc.getCommentDeletedMessage() }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToDeleteNotFound }),
	...NoBearerOrNeedToRelogin,
	ApiForbiddenResponse({ description: 'Forbidden', content: CommentSwaggerDoc.updateCommentForbidden() }),
];
