import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

@Resolver()
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) {}

  @Query(() => String)
  async test() {
    return 'hello';
  }

  @Query((returns) => Recipe)
  async recipe(@Args('id', { type: () => Int }) id: number) {
    return this.recipesService.recipe({ id });
  }

  @Query((returns) => [Recipe])
  async recipes() {
    return this.recipesService.recipes({});
  }
}
