import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { SameTeam } from 'src/decorators/sameTeam.decorator';
import { SameTeamGetId } from 'src/enum/sameTeam.enum';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }

  @SameTeam(SameTeamGetId.IN_PARAMS)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamsService.findOne(+id);
  }

  @SameTeam(SameTeamGetId.IN_PARAMS)
  @Roles(Role.Admin, Role.Leader)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamsService.update(+id, updateTeamDto);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamsService.remove(+id);
  }
}
