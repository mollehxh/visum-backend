import {
  Column,
  DataType,
  Model,
  Table,
  BelongsToMany,
  BelongsTo,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Message } from 'src/messages/messages.model';
import { User } from 'src/users/users.model';
import { RoomUsers } from './room-users.model';

@Table({ tableName: 'rooms' })
export class Room extends Model<Room> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  videoUrl: string;

  @Column({ type: DataType.STRING })
  previewUrl: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  owner: User;

  @BelongsToMany(() => User, () => RoomUsers)
  users: User[];

  @HasMany(() => Message)
  messages: Message[];
}
