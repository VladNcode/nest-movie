import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
	async canActivate(context: ExecutionContext) {
		const onlyAdminRoutes = [
			'createMovie',
			'uploadPosters',
			'updateMovie',
			'deleteMovie',
			'createActor',
			'uploadPhoto',
			'updateActor',
			'deleteActor',
			'getUsers',
			'getUser',
			'deleteUser',
		];

		const route = context.getHandler().name;

		if (onlyAdminRoutes.includes(route)) {
			const { user } = context.switchToHttp().getRequest();

			if (user && user.role === 'admin') {
				return true;
			} else {
				throw new ForbiddenException(`This route is only available to users with roles: ['admin']`);
			}
		}

		return true;
	}
}
