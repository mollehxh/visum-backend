import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/auth-user.decorator';
import { User } from 'src/users/users.model';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomsService } from './rooms.service';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  create(@AuthUser() user: User, @Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto, user.id);
  }

  @Get()
  getAll() {
    return this.roomsService.getAll();
  }

  @Get(':roomId')
  getById(@Param('roomId', ParseIntPipe) roomId) {
    return this.roomsService.findById(roomId);
  }
}
