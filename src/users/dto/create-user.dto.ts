import { IsNotEmpty, IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  password: string;

  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(32)
  username: string;
}
