import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Room } from 'src/rooms/rooms.model';
import { User } from 'src/users/users.model';

@Table({ tableName: 'messages' })
export class Message extends Model<Message> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  body: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  sender: User;

  @ForeignKey(() => Room)
  @Column({ type: DataType.INTEGER })
  roomId: number;

  @BelongsTo(() => Room)
  room: Room;
}
