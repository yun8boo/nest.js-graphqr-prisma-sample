import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(private readonly prismService: PrismaService) {}

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | undefined> {
    return this.prismService.user.findUnique({
      where: userWhereUniqueInput,
    });
  }
  async createUser(userCreateInput: Prisma.UserCreateInput) {
    try {
      return this.prismService.user.create({ data: userCreateInput });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          `Email ${userCreateInput.email} already used.`,
        );
      } else {
        throw new Error(error);
      }
    }
  }
}
