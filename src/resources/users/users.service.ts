import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import SaltNumber from 'src/entities/SaltNumber';
import User from 'src/entities/User';
import { HashService } from 'src/services/hash/hash.service';
import { Repository } from 'typeorm';
import { AuthUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(SaltNumber)
    private saltNumberRepository: Repository<SaltNumber>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try{
      const { email, password } = createUserDto;
      const { hash, saltOrRounds } = await this.hashService.generateHash(email+password)
      createUserDto.password = hash;
      const user = await this.userRepository.save(createUserDto);
      await this.saltNumberRepository.save({
        user_id: user.id,
        salt: saltOrRounds
      })
      delete user.password
      return user;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try{
      return await this.userRepository.find({
        relations: ['roles']
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneOrFail(id, {
        relations: ['roles']
      })
    } catch (error) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      if(updateUserDto.email)
        throw new HttpException("Não é possível alterar o email", HttpStatus.BAD_REQUEST);

      if(updateUserDto.password) {
        const { email } = await this.userRepository.findOne(id)
        const { hash, saltOrRounds } = await this.hashService.generateHash(email+updateUserDto.password)
        updateUserDto.password = hash
        await this.saltNumberRepository.update(id, {
          salt: saltOrRounds
        })
      }
      return await this.userRepository.update(id, updateUserDto)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível atualizar o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      return await this.userRepository.delete(id)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível remover o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async authentication(authDto: AuthUserDto) {
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
      return userAuthenticated;
    } catch(error) {
      throw new UnauthorizedException();
    }
  }
}
