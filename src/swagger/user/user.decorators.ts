import { ApiBadRequestResponse, ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { SwaggerFileDecorator } from '../../decorators/swagger-file-upload.decorator';
import { FileUploadError } from '../errors/file-upload-error.class';
import { RecordToUpdateNotFound } from '../errors/record-to-update-not-found.class';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { UserSwaggerDoc } from './user.class';

export const getUsers = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns users array', content: UserSwaggerDoc.getUsers() }),
	...NoBearerOrNeedToRelogin,
];

export const getMe = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns current user', content: UserSwaggerDoc.getUser() }),
	ApiNotFoundResponse({ description: 'Not Found', content: UserSwaggerDoc.userNotFound() }),
	...NoBearerOrNeedToRelogin,
];

export const getUser = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Returns a user', content: UserSwaggerDoc.getUser() }),
	ApiNotFoundResponse({ description: 'Not Found', content: UserSwaggerDoc.userNotFound() }),
	...NoBearerOrNeedToRelogin,
];

export const uploadAvatar = [
	ApiBearerAuth('access_token'),
	SwaggerFileDecorator(),
	ApiOkResponse({ description: 'Uploads  user avatar', content: UserSwaggerDoc.updateUserSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', type: FileUploadError }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const updateUser = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Updates a user', content: UserSwaggerDoc.updateUserSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: UserSwaggerDoc.userNotFound() }),
	...NoBearerOrNeedToRelogin,
];

export const deleteUser = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Deletes user', content: UserSwaggerDoc.deleteUserSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: UserSwaggerDoc.userNotFound() }),
	...NoBearerOrNeedToRelogin,
];
