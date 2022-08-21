import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/login-user.input';
import { Token } from './entities/token.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Token, {
    description: 'ログイン',
  })
  @UseGuards(LocalAuthGuard)
  async login(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    @Args('loginUserInput') loginUserInput: LoginUserInput,
    @Context() context: { user: User },
  ) {
    return await this.authService.login(context.user);
  }
}
