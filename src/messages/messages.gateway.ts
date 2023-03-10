import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthUser } from 'src/common/auth-user.decorator';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessagesService } from './messages.service';

@WebSocketGateway({ cors: true })
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  handleConnection() {
    console.log('user connected');
  }

  handleDisconnect() {
    console.log('user disconnect');
  }

  @SubscribeMessage('CLIENT:messageSent')
  handleMessageSent(
    @ConnectedSocket() client: Socket,
    @MessageBody() createMessageDto: CreateMessageDto,
  ) {
    this.messagesService.create(createMessageDto);
    console.log(createMessageDto.roomId.toString());
    this.server
      .to(createMessageDto.roomId.toString())
      .emit('SERVER:messageSent', createMessageDto);
  }

  @SubscribeMessage('CLIENT:joinRoom')
  async handleJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.join(roomId.toString());
    console.log(client.rooms);
    console.log('user join to room: ' + roomId);

    const messages = await this.messagesService.getByRoomId(Number(roomId));

    client.emit('SERVER:joinRoom', messages);
  }

  @SubscribeMessage('CLIENT:leaveRoom')
  handleLeaveRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    client.leave(roomId.toString());
    console.log('user leave room');
  }
}
