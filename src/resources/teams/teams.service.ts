import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Team from 'src/entities/Team';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamsService {

  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>
  ) {}

  async create(createUserDto: CreateTeamDto) {
    return await this.teamRepository.save(createUserDto)
  }

  async findAll() {
    return await this.teamRepository.find()
  }

  async findOne(id: number) {
    try {
      return await this.teamRepository.findOneOrFail(id)
    } catch (error) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateUserDto: UpdateTeamDto) {
    try {
      return await this.teamRepository.update(id, updateUserDto)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível atualizar o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      return await this.teamRepository.delete(id)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível remover o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
