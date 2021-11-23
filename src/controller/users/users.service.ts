import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const user = this.users.find(user => user.id === id);
    if(!user)
      throw new HttpException(`User id -> ${id} not found`, HttpStatus.NOT_FOUND);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) 
      throw new HttpException(`User id -> ${id} not found`, HttpStatus.NOT_FOUND);
    return this.users[index] = { ...updateUserDto, id};
  }

  remove(id: number) {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) 
      throw new HttpException(`User id -> ${id} not found`, HttpStatus.NOT_FOUND);
    return this.users.splice(index, 1);
  }
}
