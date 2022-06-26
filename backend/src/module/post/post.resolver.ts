import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UserService } from '../user/user.service';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly user: UserService,
  ) {}

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Mutation(() => Post)
  async createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
    const user = await this.user.getSeedUser();
    return this.postService.create(user, createPostInput);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Query(() => [Post])
  async posts() {
    const user = await this.user.getSeedUser();
    return this.postService.findAll(user);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Query(() => Post)
  async post(@Args('uuid') uuid: string) {
    const user = await this.user.getSeedUser();
    return this.postService.findOne(user, uuid);
  }
}
