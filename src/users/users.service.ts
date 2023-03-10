import { HttpException, HttpStatus, Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import * as bcript from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (existingUser) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcript.hash(createUserDto.password, 5);

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return newUser;
  }

  async getAll() {
    const users = await this.userRepository.findAll();

    return users;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async getById(id: number) {
    const { dataValues } = await this.userRepository.findOne({ where: { id } });

    const { password, ...user } = dataValues;

    return user;
  }
}
