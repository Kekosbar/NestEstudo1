import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  
  @IsString()
  email: string
  
  @IsString()
  name: string

  @IsString()
  password: string
  
  @IsNumber()
  team_id: number
}
