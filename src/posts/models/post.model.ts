import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/users/models/user.model';

@ObjectType({ description: 'post' })
export class Post {
  @Field((tyoe) => String)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  published: boolean;

  @Field()
  userId: string;

  @Field((type) => User)
  user: User;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
