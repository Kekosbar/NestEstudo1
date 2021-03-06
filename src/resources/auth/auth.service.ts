import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataToken } from 'src/interfaces/data-token.interface';
import { Role } from 'src/enum/role.enum';
import { AuthUserDto } from '../users/dto/auth-user.dto';
import { UsersService } from '../users/users.service';
import { Payload } from 'src/interfaces/payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async authentication(authDto: AuthUserDto) {
    const userAuthenticated = await this.userService.authentication(authDto)
    const rolesInToken = userAuthenticated.roles.map(role => role.name)
    const access_token = await this.login({
      sub: userAuthenticated.id,
      username: userAuthenticated.name,
      teamId: userAuthenticated.team_id,
      roles: rolesInToken as Role[],
      create_at: new Date()
    })
    return {
      access_token,
      user: userAuthenticated
    }
  }

  private async login(data: Payload) {
    try {
      return await this.jwtService.sign(data)
    } catch(error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
