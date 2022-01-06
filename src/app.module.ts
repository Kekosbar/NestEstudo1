import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './resources/users/users.module';
import { TeamsModule } from './resources/teams/teams.module';
import { AuthModule } from './resources/auth/auth.module';
import { RolesModule } from './resources/roles/roles.module';

import { JwtAuthGuard } from './guards/jwt/jwt-auth.guard';
import { RolesGuard } from './guards/roles/roles.guard';
import { ProjectsModule } from './resources/projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/entities/*.js'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TeamsModule,
    RolesModule,
    ProjectsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
