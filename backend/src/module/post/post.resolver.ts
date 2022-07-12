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
  @Mutation(() => Post, { description: '記事を作成する' })
  async createPost(@Args('input') createPostInput: CreatePostInput) {
    const user = await this.user.getSeedUser();
    return this.postService.create(user, createPostInput);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Mutation(() => Post, { description: '記事を更新する' })
  async updatePost(
    @Args('input') updatePostInput: CreatePostInput,
    @Args('uuid') uuid: string,
  ) {
    // const user = await this.user.getSeedUser();
    return this.postService.update(uuid, updatePostInput);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Mutation(() => Post, { description: '記事を削除する' })
  deletePost(@Args('uuid') uuid: string) {
    return this.postService.delete(uuid);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Query(() => [Post], { description: '記事を複数取得する' })
  async posts() {
    const user = await this.user.getSeedUser();
    return this.postService.findAll(user);
  }

  //TODO JWTGuardを作ってuserを認証ユーザーに変える
  @Query(() => Post, { description: '記事を取得する' })
  async post(@Args('uuid') uuid: string) {
    const user = await this.user.getSeedUser();
    return this.postService.findOne(user, uuid);
  }
}
