import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {

  users: User[] = [];
  lastId = 0;

  create(createUserDto: CreateUserDto) {
    return this.users.push({
      id: this.lastId++,
      ...createUserDto
    });
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return;
    this.users[index] = { ...updateUserDto, id};
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) return;
    return this.users.splice(index, 1);
  }
}
