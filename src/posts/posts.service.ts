import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput) {
    return this.prismaService.post.findUnique({ where: postWhereUniqueInput });
  }

  async findAll({
    searchValue,
    skip,
    take,
    orderBy,
  }: {
    searchValue?: string;
    skip?: number;
    take?: number;
    orderBy?: Prisma.Enumerable<Prisma.PostOrderByWithRelationInput>;
  }) {
    const or: Prisma.Enumerable<Prisma.PostWhereInput> = searchValue
      ? {
          OR: [
            {
              title: { contains: searchValue },
            },
            { content: { contains: searchValue } },
          ],
        }
      : {};
    return this.prismaService.post.findMany({
      where: { ...or },
      skip,
      take,
      orderBy,
    });
  }

  async findUserPosts(postsWhereManyInput: Prisma.PostWhereInput) {
    return this.prismaService.post.findMany({ where: postsWhereManyInput });
  }

  async findPostUser(postsWhereManyInput: Prisma.PostWhereUniqueInput) {
    return this.prismaService.post
      .findUnique({ where: postsWhereManyInput })
      .user();
  }

  async createPost(postCreateInput: Prisma.PostCreateInput) {
    return this.prismaService.post.create({
      data: postCreateInput,
    });
  }

  async updatePost({
    id,
    postUpdateInput,
  }: {
    id: string;
    postUpdateInput: Prisma.PostUpdateInput;
  }) {
    return this.prismaService.post.update({
      where: { id },
      data: postUpdateInput,
    });
  }

  async deletePost(id: string) {
    return this.prismaService.post.delete({
      where: { id },
    });
  }
}
