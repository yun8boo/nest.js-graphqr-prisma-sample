import { Args, Query, Resolver } from '@nestjs/graphql';
import { Post } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver(Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => Post)
  async post(@Args('id') id: string) {
    return this.postsService.findOne({ id });
  }
}
