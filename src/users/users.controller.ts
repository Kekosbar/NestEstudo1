import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserDto } from 'src/user-dto';

class User {
  id: number;
  name: string;
  email?: string;
}

@Controller('users')
export class UsersController {
  users: User[] = [];
  lastId: number = 0;

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() user: UserDto) {
    this.users.push({
      id: this.lastId++,
      name: user.name,
      email: user.email,
    });
  }

  @Get()
  findAll(): User[] {
    return this.users;
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) params): User {
    const { id } = params
    const user = this.users.find(item => item.id === id)
    return user;
  }
}
