import { applyDecorators, UseGuards } from '@nestjs/common';

import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from '../auth/guards';
import { Roles } from './roles.decorator';

export function Auth(roles: string) {
	return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard), Roles(roles));
}
