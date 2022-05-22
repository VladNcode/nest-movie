import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from '@nestjs/swagger';

import { SwaggerFileDecorator } from '../../decorators/swagger-file-upload.decorator';
import { RecordToUpdateNotFound, FileUploadError, RecordToDeleteNotFound } from '../../exports/swagger-errors';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { ActorSwaggerDoc } from './actor.class';
import { RETURNS_UPDATED_ACTOR } from './actor.constants';

export const getActors = [ApiOkResponse({ description: 'Returns actors array', content: ActorSwaggerDoc.getActors() })];

export const getActor = [
	ApiOkResponse({ description: 'Returns an actor', content: ActorSwaggerDoc.getActor() }),
	ApiNotFoundResponse({ description: 'Not Found', content: ActorSwaggerDoc.actorNotFound() }),
];

export const createActor = [
	ApiBearerAuth('access_token'),
	ApiCreatedResponse({ description: 'Creates an actor', content: ActorSwaggerDoc.getActor() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: ActorSwaggerDoc.createActorBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const uploadPhoto = [
	ApiBearerAuth('access_token'),
	SwaggerFileDecorator(),
	ApiOkResponse(RETURNS_UPDATED_ACTOR),
	ApiBadRequestResponse({ description: 'Bad Request', type: FileUploadError }),
	...NoBearerOrNeedToRelogin,
];

export const updateActor = [
	ApiBearerAuth('access_token'),
	ApiOkResponse(RETURNS_UPDATED_ACTOR),
	ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const deleteActor = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Deletes actor record', content: ActorSwaggerDoc.getActorDeletedMessage() }),
	ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToDeleteNotFound }),
	...NoBearerOrNeedToRelogin,
];
