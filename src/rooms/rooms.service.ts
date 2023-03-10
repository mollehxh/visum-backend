import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { Room } from './rooms.model';

@Injectable()
export class RoomsService {
  constructor(
    @InjectModel(Room) private readonly roomRepository: typeof Room,
    private readonly usersService: UsersService,
  ) {}

  async create(createRoomDto: CreateRoomDto, id: number) {
    const roomOwner = await this.usersService.getById(id);
    const room = await this.roomRepository.create({
      ...createRoomDto,
      userId: id,
    });
    await room.$set('users', roomOwner.id);

    return room;
  }

  async getAll() {
    const rooms = await this.roomRepository.findAll({
      include: [{ model: User, as: 'owner' }],
      attributes: { exclude: ['userId'] },
    });

    return rooms;
  }

  async findById(id: number) {
    const room = await this.roomRepository.findOne({
      where: { id },
      include: { all: true },
    });

    return room;
  }
}
