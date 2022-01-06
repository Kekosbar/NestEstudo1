import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Project from 'src/entities/Project';
import { getManager, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private repository: Repository<Project>
  ) {}

  async create(createRoleDto: CreateProjectDto) {
    try {
      return await this.repository.save(createRoleDto)
    } catch (error) {
      throw new HttpException({
        message: 'Falha ao cadastrar o registro',
        bd_message: error
      }, HttpStatus.NOT_FOUND)
    }
  }

  async findAll() {
    try {
      return await this.repository.find()
    } catch (error) {
      throw new HttpException('Falha ao obter os registros', HttpStatus.NOT_FOUND)
    }
  }

  async findOne(id: number) {
    try {
      return await this.repository.findOneOrFail(id)
    } catch (error) {
      throw new HttpException('Registro não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  async update(id: number, updateRoleDto: UpdateProjectDto) {
    try {
      if(updateRoleDto.teams) {
        await getManager().query(`DELETE FROM teams_projects WHERE "projectsId" = ${id}`)
        const teams_projects = updateRoleDto.teams.map(t => ({ projectsId: id, teamsId: t.id }))
        await getManager()
          .createQueryBuilder()
          .insert()
          .into('teams_projects')
          .values(teams_projects)
          .execute()
        delete updateRoleDto.teams;
      }
      return await this.repository.update(id, updateRoleDto)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível atualizar o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: number) {
    try {
      return await this.repository.delete(id)
    } catch (error) {
      throw new HttpException({
        message: 'Não foi possível remover o registro',
        bd_error: error.message
      }, HttpStatus.BAD_REQUEST)
    }
  }
}
