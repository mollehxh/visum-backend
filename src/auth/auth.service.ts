import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUserCredentials(userCredentialsDto: UserCredentialsDto) {
    const user = await this.usersService.getByEmail(userCredentialsDto.email);

    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.UNAUTHORIZED);
    }

    const isPasswordValid = bcrypt.compareSync(
      userCredentialsDto.password,
      user.password,
    );

    return isPasswordValid ? user : null;
  }

  async signIn(email: string) {
    const { dataValues } = await this.usersService.getByEmail(email);

    const { password, ...user } = dataValues;

    const payload = { sub: user.id, email: user.email };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const { dataValues } = await this.usersService.create(createUserDto);

    const { password, ...user } = dataValues;

    const payload = { sub: user.id, email: user.email };

    return {
      ...user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
