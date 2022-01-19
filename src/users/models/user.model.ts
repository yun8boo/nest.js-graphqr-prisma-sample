import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';

@ObjectType({ description: 'user' })
export class User {
  @Field((tyoe) => String)
  id: string;

  @Field()
  email: string;

  @HideField()
  password: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  firstName: string | null;

  @Field({ nullable: true })
  lastName: string | null;

  @Field((type) => [Post], { nullable: true })
  posts?: Post[];
}
