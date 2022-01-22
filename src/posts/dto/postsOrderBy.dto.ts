import { Field, InputType, registerEnumType } from '@nestjs/graphql';

// type SortType = 'asc' | 'desc';

@InputType()
export class PostsOrderByInput {
  @Field((type) => SortType, { nullable: true })
  updatedAt: SortType;
}

enum SortType {
  asc = 'asc',
  desc = 'desc',
}

registerEnumType(SortType, {
  name: 'SortType',
  description: 'Properties by which post connections can be ordered.',
});
