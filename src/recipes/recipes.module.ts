import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  providers: [PrismaService, RecipesService, RecipesResolver],
})
export class RecipesModule {}
