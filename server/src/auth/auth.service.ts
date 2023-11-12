import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { IUser } from '../types/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    const passwordsIsMatch = await argon2.verify(user.password, pass);
    if (user && passwordsIsMatch) {
      return user;
    } else {
      return null;
    }
  }

  async login(user: IUser) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }
}
