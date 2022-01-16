import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { UserPayloadType } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login({ createdAt, updatedAt, ...user }: Omit<User, 'password'>) {
    const payload: UserPayloadType = user;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
