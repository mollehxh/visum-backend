import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';
import { Room } from './rooms.model';

@Table({ tableName: 'room_users', createdAt: false, updatedAt: false })
export class RoomUsers extends Model<RoomUsers> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER })
  roomId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
