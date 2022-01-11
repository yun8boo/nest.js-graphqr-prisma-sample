import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Recipe, Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async recipes(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RecipeWhereUniqueInput;
    where?: Prisma.RecipeWhereInput;
    orderBy?: Prisma.RecipeOrderByWithRelationInput;
  }): Promise<Recipe[]> {
    return this.prisma.recipe.findMany(params);
  }
  async recipe(
    recipeWhereUniqueInput: Prisma.RecipeWhereUniqueInput,
  ): Promise<Recipe | null> {
    return this.prisma.recipe.findUnique({ where: recipeWhereUniqueInput });
  }
}
