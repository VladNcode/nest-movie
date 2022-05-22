import {
	ApiBadRequestResponse,
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
} from '@nestjs/swagger';

import { SwaggerFileDecorator } from '../../decorators/swagger-file-upload.decorator';
import { FileUploadError } from '../errors/file-upload-error.class';
import { RecordToUpdateNotFound } from '../errors/record-to-update-not-found.class';
import { NoBearerOrNeedToRelogin } from '../global-unauthorized-no-bearer/no-bearer-unauth.decorator';
import { MovieSwaggerDoc } from './movie.class';

export const getMovies = [ApiOkResponse({ description: 'Returns movies array', content: MovieSwaggerDoc.getMovies() })];

export const getMovie = [
	ApiOkResponse({ description: 'Returns a movie', content: MovieSwaggerDoc.getMovie() }),
	ApiNotFoundResponse({ description: 'Not Found', content: MovieSwaggerDoc.movieNotFound() }),
];

export const createMovie = [
	ApiBearerAuth('access_token'),
	ApiCreatedResponse({ description: 'Creates a movie', content: MovieSwaggerDoc.createMovieSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: MovieSwaggerDoc.createMovieBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const uploadPosters = [
	ApiBearerAuth('access_token'),
	SwaggerFileDecorator(),
	ApiOkResponse({ description: 'Updates a movie', content: MovieSwaggerDoc.createMovieSuccess() }),
	ApiBadRequestResponse({ description: 'Bad Request', type: FileUploadError }),
	ApiNotFoundResponse({ description: 'Not Found', type: RecordToUpdateNotFound }),
	...NoBearerOrNeedToRelogin,
];

export const updateMovie = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Updates a movie', content: MovieSwaggerDoc.updateMovieSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: MovieSwaggerDoc.movieNotFound() }),
	ApiBadRequestResponse({ description: 'Bad Request', content: MovieSwaggerDoc.createMovieBadRequest() }),
	...NoBearerOrNeedToRelogin,
];

export const deleteMovie = [
	ApiBearerAuth('access_token'),
	ApiOkResponse({ description: 'Deletes movie record', content: MovieSwaggerDoc.deleteMovieSuccess() }),
	ApiNotFoundResponse({ description: 'Not Found', content: MovieSwaggerDoc.movieNotFound() }),
	...NoBearerOrNeedToRelogin,
];
