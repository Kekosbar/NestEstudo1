import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { LocalStrategy } from './local.strategy';
import { AuthDto } from './dto/auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly localStrategy: LocalStrategy) {}

  @Post()
  @HttpCode(200)
  authentication(@Body() authDto: AuthDto) {
    return this.localStrategy.validate(authDto)
  }
}
