import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(
		private reflector: Reflector,
		private readonly jwtService: JwtService,
		private readonly userService: UserService,
	) {}

	async canActivate(context: ExecutionContext) {
		const roles = this.reflector.get<string[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}

		const request = context.switchToHttp().getRequest();
		const token = request.headers.authorization.split(' ')[1];
		const decoded = this.jwtService.decode(token);

		if (typeof decoded === 'object') {
			const email = decoded?.email;
			const user = await this.userService.getUser({ email });

			if (user && roles.includes(user.role)) {
				return true;
			}
		}

		throw new UnauthorizedException(`This route is only available to users with roles: [${roles}]`);
	}
}
