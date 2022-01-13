import { Injectable } from '@nestjs/common';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  private readonly users: User = [];
}
