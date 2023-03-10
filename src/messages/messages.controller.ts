import {
  Body,
  Controller,
  Param,
  Post,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from 'src/users/users.model';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create/:roomId')
  async create(
    @AuthUser() user: User,
    @Body() body,
    @Param('roomId', ParseIntPipe) roomId: number,
  ) {
    return this.messagesService.create({
      userId: user.id,
      body: body.body,
      roomId,
    });
  }
}
