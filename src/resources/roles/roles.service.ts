import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Role from 'src/entities/Role';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.save(createRoleDto)
  }

  async findAll() {
    return await this.roleRepository.find()
  }

  async findOne(id: number) {
    try {
      return await this.roleRepository.findOneOrFail(id)
    } catch (error) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.roleRepository.update(id, updateRoleDto)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível atualizar o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      return await this.roleRepository.delete(id)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível remover o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
