import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { Post as PostModel } from '../../../prisma/@generated/prisma-nestjs-graphql/post/post.model';
import { User } from '../../user/entities/user.entity';
import { Category } from '../../category/entities/category.entity';

@ObjectType()
export class Post extends PickType(PostModel, [
  'uuid',
  'id',
  'title',
  'content',
  'createdAt',
  'updatedAt',
  'updatedAt',
  'isPublished',
  'authorId',
]) {
  @Field(() => User, { description: '投稿者' })
  author?: User;

  @Field(() => [Category], { description: 'カテゴリー' })
  categories?: Category[];
}
