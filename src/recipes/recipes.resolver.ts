import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CreateRecipeInput } from './dto/createRecipe.dto';
import { UpdateRecipeInput } from './dto/updateRecipe.dto';
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
  async recipe(@Args('id', { type: () => String }) id: string) {
    return this.recipesService.recipe({ id });
  }

  @Query((returns) => [Recipe])
  async recipes() {
    return this.recipesService.recipes({});
  }

  @Mutation((returns) => Recipe)
  async createRecipe(
    @Args('createRecipeInput') { title, description }: CreateRecipeInput,
  ) {
    return this.recipesService.createRecipe({
      title,
      description,
    });
  }

  @Mutation((returns) => Recipe)
  async updateRecipe(
    @Args('updateRecipeInput') { id, title, description }: UpdateRecipeInput,
  ) {
    return this.recipesService.updateRecipe({
      where: { id },
      data: { title, description },
    });
  }
}
