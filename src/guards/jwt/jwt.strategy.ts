import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Payload } from 'src/interfaces/payload.interface';
import { UserInterface } from 'src/interfaces/user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY_TOKEN,
    });
  }

  validate(payload: Payload): UserInterface {
    return { 
      userId: payload.sub, 
      username: payload.username,
      teamId: payload.teamId,
      roles: payload.roles,
      create_at: payload.create_at
    };
  }
}