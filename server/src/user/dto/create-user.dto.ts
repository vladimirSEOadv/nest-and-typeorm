import { IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail() // {}, { message: 'Invalid email format' }
  @ApiProperty({
    description: 'Email',
    type: String,
    default: 'test2@gmail.com',
  })
  email: string;

  @MinLength(6, { message: 'Password must be more then 6 symbols' })
  @ApiProperty({
    title: 'Password',
    description: 'Password',
    minimum: 6,
    type: String,
    example: '111111',
    default: '111111',
  })
  password: string;
}
