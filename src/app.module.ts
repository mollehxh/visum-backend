import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RoomsModule } from './rooms/rooms.module';
import { Room } from './rooms/rooms.model';
import { RoomUsers } from './rooms/room-users.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { MessagesModule } from './messages/messages.module';
import { Message } from './messages/messages.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      models: [User, Room, Role, Message, RoomUsers, UserRoles],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    RoomsModule,
    RolesModule,
    MessagesModule,
  ],
  controllers: [],
})
export class AppModule {}
