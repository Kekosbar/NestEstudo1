import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/entities/User';
import SaltNumber from 'src/entities/SaltNumber';
import { HashService } from 'src/services/hash/hash.service';
import { DataToken } from 'src/interfaces/data-token.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SaltNumber)
    private saltNumberRepository: Repository<SaltNumber>,
    private hashService: HashService,
    private jwtService: JwtService
  ) {}

  async authentication(authDto: AuthDto) {
    try {
      const user = await this.userRepository.findOneOrFail({ email: authDto.email })
      const saltNumber = await this.saltNumberRepository.findOneOrFail(user.id)
      const { hash } = await this.hashService.generateHash(authDto.email+authDto.password, saltNumber.salt)
      const userAuthenticated = await this.userRepository.findOneOrFail({
        id: user.id,
        password: hash
      }, {
        relations: ['roles']
      })
      // const rolesInToken = userAuthenticated.roles.map(role => role.name)
      const access_token = await this.login({
        sub: userAuthenticated.id,
        // roles: rolesInToken,
        create_at: new Date()
      })
      return {
        access_token,
        user: userAuthenticated
      }
    } catch(error) {
      throw new UnauthorizedException();
    }
  }

  private async login(data: DataToken) {
    try {
      return await this.jwtService.sign(data)
    } catch(error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
