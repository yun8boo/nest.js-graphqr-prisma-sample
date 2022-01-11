import { Resolver, Query } from '@nestjs/graphql';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query((returns) => String)
  async test() {
    return 'hello';
  }
}
