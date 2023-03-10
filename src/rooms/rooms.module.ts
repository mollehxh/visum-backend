import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersModule } from 'src/users/users.module';
import { RoomUsers } from './room-users.model';
import { RoomsController } from './rooms.controller';
import { Room } from './rooms.model';
import { RoomsService } from './rooms.service';

@Module({
  imports: [SequelizeModule.forFeature([Room, RoomUsers, User]), UsersModule],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class RoomsModule {}
