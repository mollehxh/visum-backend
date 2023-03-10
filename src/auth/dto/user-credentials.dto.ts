import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UserCredentialsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(16)
  password: string;
}
