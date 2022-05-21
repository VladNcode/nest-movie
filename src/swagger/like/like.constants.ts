import { ApiBadRequestResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';

import { LikeSwaggerDoc } from './like.class';

export const BAD_REQUEST_NOT_FOUND_NO_BEARER_NEED_TO_RELOGIN = [
	ApiBadRequestResponse({ description: 'Bad Request', content: LikeSwaggerDoc.LikeBadRequest() }),
	ApiNotFoundResponse({ description: 'Not Found', content: LikeSwaggerDoc.RecordNotFound() }),
	...NoBearerOrNeedToRelogin,
];
