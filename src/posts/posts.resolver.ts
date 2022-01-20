import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Query,
  ResolveField,
  Resolver,
  Root,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-gql-auth.guard';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { User } from 'src/users/models/user.model';
import { CreatePostInput } from './dto/createPost.dto';
import { DeletePostInput } from './dto/deletePost.dto';
import { UpdatePostInput } from './dto/updatePost.dto';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  async post(@Args('id') id: string) {
    return this.postsService.findOne({ id });
  }

  @ResolveField()
  async user(@Root() post: Post) {
    return this.postsService.findPostUser({ id: post.id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async createPost(
    @CurrentUser() user: Omit<User, 'password'>,
    @Args('createPostInput') { title, content }: CreatePostInput,
  ) {
    return this.postsService.createPost({
      title,
      content,
      user: { connect: { id: user.id } },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async updatePost(
    @CurrentUser() user: Omit<User, 'password'>,
    @Args('updatePostInput') { id, title, content }: UpdatePostInput,
  ) {
    return this.postsService.updatePost({
      id,
      postUpdateInput: { title, content },
    });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Post)
  async deletePost(
    @CurrentUser() user: Omit<User, 'password'>,
    @Args('deletePostInput') { id }: DeletePostInput,
  ) {
    return this.postsService.deletePost(id);
  }
}
