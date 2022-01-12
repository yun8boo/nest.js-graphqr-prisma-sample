import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateRecipeInput {
  @Field((type) => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;
}
