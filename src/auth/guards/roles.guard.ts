import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		// const route = context.getHandler().name;
		// const arr = ['test', 'login'];
		// console.log(route);
		// console.log(route === 'test');

		const { user } = context.switchToHttp().getRequest();

		if (user && roles.includes(user.role)) {
			return true;
		}

		throw new UnauthorizedException(`This route is only available to users with roles: [${roles}]`);
	}
}
