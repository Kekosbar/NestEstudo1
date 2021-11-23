import { Module } from '@nestjs/common';
import { UsersModule } from './controller/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
