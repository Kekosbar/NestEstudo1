import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  email?: string;
}
