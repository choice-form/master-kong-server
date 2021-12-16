import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSysUserDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
