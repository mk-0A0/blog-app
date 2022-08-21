import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UserService } from '../user/user.service';
import { UpdatePostInput } from './dto/update-post.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../decorators/CurrentUser';
import { User } from '../user/entities/user.entity';

@Resolver(() => Post)
export class PostResolver {
  constructor(
    private readonly postService: PostService,
    private readonly user: UserService,
  ) {}

  @Mutation(() => Post, { description: '記事を作成する' })
  @UseGuards(JwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @CurrentUser() user: User,
  ) {
    return this.postService.create(user, createPostInput);
  }

  //TODO 現在ログインしているユーザーの投稿のみ更新できるようにする
  @Mutation(() => Post, { description: '記事を更新する' })
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @Args('input') updatePostInput: UpdatePostInput,
    @Args('uuid') uuid: string,
  ) {
    // const user = await this.user.getSeedUser();
    return this.postService.update(uuid, updatePostInput);
  }

  //TODO 現在ログインしているユーザーの投稿のみ削除できるようにする
  @Mutation(() => Post, { description: '記事を削除する' })
  @UseGuards(JwtAuthGuard)
  deletePost(@Args('uuid') uuid: string) {
    return this.postService.delete(uuid);
  }

  //TODO 名前を変える
  @Query(() => [Post], { description: '記事を複数取得する' })
  @UseGuards(JwtAuthGuard)
  async posts() {
    const user = await this.user.getSeedUser();
    return this.postService.findAll(user);
  }

  //TODO 名前を変える
  @Query(() => Post, { description: '記事を取得する' })
  @UseGuards(JwtAuthGuard)
  async post(@Args('uuid') uuid: string) {
    const user = await this.user.getSeedUser();
    return this.postService.findOne(user, uuid);
  }
}
