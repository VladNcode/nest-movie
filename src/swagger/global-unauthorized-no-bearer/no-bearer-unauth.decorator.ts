import { ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

import { NO_BEARER, NEED_TO_RELOGIN } from '../auth/auth.constants';

export const NoBearerOrNeedToRelogin = [ApiUnauthorizedResponse(NO_BEARER), ApiForbiddenResponse(NEED_TO_RELOGIN)];
