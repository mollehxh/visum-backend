import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthUser } from 'src/common/auth-user.decorator';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getMe(@AuthUser() user) {
    return this.usersService.getById(user.id);
  }
}
