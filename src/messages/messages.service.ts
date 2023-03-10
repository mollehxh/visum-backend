import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/users.model';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './messages.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message) private readonly messagesRepository: typeof Message,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const message = await this.messagesRepository.create(createMessageDto);

    return message;
  }

  async getByRoomId(roomId: number) {
    const messages = await this.messagesRepository.findAll({
      where: { roomId },
    });

    return messages;
  }
}
