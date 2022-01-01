import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsNumber()
  age: number
  
  @IsString()
  email: string
  
  @IsString()
  name: string
  
  @IsNumber()
  team_id: number
}
