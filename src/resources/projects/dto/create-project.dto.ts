import { IsArray, IsOptional, IsString } from "class-validator";
import Team from "src/entities/Team";

export class CreateProjectDto {

  @IsString()
  name: string

  @IsArray()
  @IsOptional()
  teams: Team[]
}
