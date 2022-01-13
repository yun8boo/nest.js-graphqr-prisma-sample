import { Injectable } from '@nestjs/common';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async validateUser(
    id: number,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.user(id);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
