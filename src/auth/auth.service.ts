import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from 'src/password/password.service';
import { User } from 'src/users/models/user.model';
import { UsersService } from 'src/users/users.service';
import { SignupInput } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOne({ email });
    user;
    if (user) {
      const isValidatePassword = await this.passwordService.validatePassword(
        password,
        user.password,
      );
      if (isValidatePassword) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async signup(data: SignupInput) {
    const hashPassword = await this.passwordService.hashPassword(data.password);
    const { password, ...result } = await this.usersService.createUser({
      ...data,
      password: hashPassword,
    });
    return {
      access_token: this.jwtService.sign(result),
    };
  }

  async login(user: Omit<User, 'password'>) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async currentUser(id: string) {
    return this.usersService.findOne({ id });
  }
}
