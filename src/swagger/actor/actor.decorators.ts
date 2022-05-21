import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';

import { SwaggerFileDecorator } from '../../decorators/swagger-file-upload.decorator';
import { RecordToUpdateNotFound, FileUploadError, RecordToDeleteNotFound } from '../../exports/swagger-errors';
import { ActorSwaggerDoc } from './actor.class';
import { RETURNS_UPDATED_ACTOR } from './actor.constants';

export const getActors = [ApiOkResponse({ description: 'Returns actors array', content: ActorSwaggerDoc.getActors() })];

export const getActor = [
	ApiOkResponse({ description: 'Returns an actor', content: ActorSwaggerDoc.getActor() }),
	ApiNotFoundResponse({ description: 'Not Found', content: ActorSwaggerDoc.actorNotFound() }),
];

export const createActor = [
	ApiCreatedResponse({ description: 'Creates an actor', content: ActorSwaggerDoc.getActor() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: ActorSwaggerDoc.createActorBadRequest() }),
];

export const uploadPhoto = [
	SwaggerFileDecorator(),
	ApiOkResponse(RETURNS_UPDATED_ACTOR),
	ApiNotFoundResponse({ description: 'Not Found', type: FileUploadError }),
];

export const updateActor = [
	ApiOkResponse(RETURNS_UPDATED_ACTOR),
	ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToUpdateNotFound }),
];

export const deleteActor = [
	ApiOkResponse({ description: 'Deletes actor record', content: ActorSwaggerDoc.getActorDeletedMessage() }),
	ApiNotFoundResponse({ status: 404, description: 'Not Found', type: RecordToDeleteNotFound }),
];
