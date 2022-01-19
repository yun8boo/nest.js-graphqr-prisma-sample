import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { PostsService } from 'src/posts/posts.service';
import { User } from './models/user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => User)
  async user(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne({ id });
  }

  @ResolveField(() => [Post])
  async posts(@Parent() user: User) {
    const { id } = user;
    return this.postsService.findUserPosts({ userId: id });
  }
}
