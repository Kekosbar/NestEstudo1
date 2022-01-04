import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/entities/User';
import SaltNumber from 'src/entities/SaltNumber';
import { HashService } from 'src/services/hash/hash.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, SaltNumber])
  ],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService]
})
export class UsersModule {}
