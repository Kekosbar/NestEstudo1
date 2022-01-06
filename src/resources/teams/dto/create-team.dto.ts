import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"
import Project from "src/entities/Project"

export class CreateTeamDto {

  @IsBoolean()
  @IsOptional()
  closed: boolean
  
  @IsString()
  name: string

  @IsNumber()
  @IsOptional()
  leader_id: number

  @IsArray()
  @IsOptional()
  projects: Project[]

}
