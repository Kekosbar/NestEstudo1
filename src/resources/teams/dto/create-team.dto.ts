import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateTeamDto {

  @IsBoolean()
  @IsOptional()
  closed: boolean
  
  @IsString()
  name: string

  @IsNumber()
  @IsOptional()
  leader_id: number

}
