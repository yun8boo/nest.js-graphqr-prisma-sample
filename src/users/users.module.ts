import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PostsService } from 'src/posts/posts.service';

@Module({
  providers: [PrismaService, UsersService, UsersResolver, PostsService],
  exports: [UsersService],
})
export class UsersModule {}
