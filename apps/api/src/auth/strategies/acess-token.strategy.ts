import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { CONSTANTS } from 'src/constants';
import { EnvService } from 'src/env/env.service';
import { JwtPayload } from '../types';
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(
  Strategy,
  CONSTANTS.AT_STRATEGY,
) {
  constructor(private readonly envService: EnvService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envService.get('AUTH_SECRET'),
    });
  }
  validate(payload: JwtPayload) {
    return payload;
  }
}
