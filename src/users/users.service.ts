import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      email: 'asd@test.com',
      password: '12345',
    },
    {
      id: 2,
      email: 'asdf@test.com',
      password: '12345',
    },
    {
      id: 3,
      email: 'asdg@test.com',
      password: '12345',
    },
  ];

  async user(id: number): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
