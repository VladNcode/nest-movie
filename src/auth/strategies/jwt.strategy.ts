import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../../user/user.service';
import { LOGIN_OR_PASSWORD_WAS_CHANGED } from '../auth.constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		private readonly configService: ConfigService,
		private readonly userService: UserService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET'),
		});
	}

	async validate({ email, id, iat }: Pick<User, 'email' | 'id'> & { iat: number }) {
		const userExist = await this.userService.getUserByEmail(email);

		if (!userExist) {
			throw new UnauthorizedException(LOGIN_OR_PASSWORD_WAS_CHANGED);
		}

		const passwordChangedAt = parseInt(
			(userExist.passwordChangedAt.getTime() / 1000).toString(),
			10,
		);

		if (passwordChangedAt > iat) {
			throw new UnauthorizedException(LOGIN_OR_PASSWORD_WAS_CHANGED);
		}

		return { email, id };
	}
}
