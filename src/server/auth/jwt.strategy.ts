import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import {jwtConstantsSecret} from "./auth.constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: jwtConstantsSecret,
        });
    }

    async validate(payload: { user_id: number }) {
        const user = await this.usersService.findOne(payload.user_id);

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
