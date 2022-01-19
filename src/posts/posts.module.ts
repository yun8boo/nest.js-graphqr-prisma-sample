import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';

@Module({
  providers: [PrismaService, PostsService, PostsResolver],
})
export class PostsModule {}
