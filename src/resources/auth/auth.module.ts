import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashService } from 'src/services/hash/hash.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import SaltNumber from 'src/entities/SaltNumber';
import User from 'src/entities/User';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User, SaltNumber]),
    JwtModule.register({
      secret: process.env.SECRET_KEY_TOKEN,
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, HashService, JwtStrategy]
})
export class AuthModule {}
