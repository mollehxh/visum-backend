import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { Message } from './messages.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Message])],
  providers: [MessagesService, MessagesGateway],
  controllers: [MessagesController],
})
export class MessagesModule {}
