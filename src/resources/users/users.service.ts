import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/User';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    try {
      return await this.userRepository.findOneOrFail(id)
    } catch (error) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
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
}
