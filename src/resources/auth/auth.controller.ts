import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { Public } from '../../decorators/auth.decorator';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  @HttpCode(200)
  authentication(@Body() authDto: AuthUserDto) {
    return this.authService.authentication(authDto);
  }
}
