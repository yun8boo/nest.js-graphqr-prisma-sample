import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { RecipesModule } from './recipes/recipes.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CurrentUserModule } from './current-user/current-user.module';
import { PasswordService } from './password/password.service';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      debug: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'schema.gql'),
      sortSchema: true,
    }),
    RecipesModule,
    AuthModule,
    UsersModule,
    CurrentUserModule,
    PostsModule,
  ],
  providers: [PasswordService],
})
export class AppModule {}
