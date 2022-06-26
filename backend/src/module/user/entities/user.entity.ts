import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { User as UserModel } from '../../../prisma/@generated/prisma-nestjs-graphql/user/user.model';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class User extends PickType(UserModel, ['email', 'name', 'id', 'uuid']) {
  @Field(() => [Post], { description: '投稿' })
  posts: Post[];
}
