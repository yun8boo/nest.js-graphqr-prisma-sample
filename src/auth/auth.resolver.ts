import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/current-user/current-user.decorator';
import { User } from 'src/users/models/user.model';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './jwt-gql-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Query((returns) => User)
  @UseGuards(GqlAuthGuard)
  currentUser(@CurrentUser() user: Omit<User, 'password'>) {
    return this.authService.currentUser(user.id);
  }
}
