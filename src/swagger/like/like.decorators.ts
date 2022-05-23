import { ApiBadRequestResponse, ApiOkResponse, ApiSecurity } from '@nestjs/swagger';

import { LikeSwaggerDoc } from './like.class';
import { BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN } from './like.constants';

export const userAlreadyLiked = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns like status', content: LikeSwaggerDoc.userLikedAlready() }),
	...BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN,
];

export const countLikes = [
	ApiOkResponse({ description: 'Returns like count', content: LikeSwaggerDoc.getLikeCount() }),
	...BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN,
];

export const create = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Returns created like', content: LikeSwaggerDoc.createLikeSuccess() }),
	...BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN,
	ApiBadRequestResponse({ description: 'Bad Request', content: LikeSwaggerDoc.createLikeBadRequest() }),
];

export const deleteLike = [
	ApiSecurity({ admin_token: [], access_token: [] }),
	ApiOkResponse({ description: 'Deletes like success', content: LikeSwaggerDoc.deleteLikeMessage() }),
	...BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN,
	ApiBadRequestResponse({ description: 'Bad Request', content: LikeSwaggerDoc.deleteLikeBadRequest() }),
];
