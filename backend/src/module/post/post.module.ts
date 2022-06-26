import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { UserService } from '../user/user.service';

@Module({
  providers: [PostResolver, PostService, UserService],
})
export class PostModule {}
