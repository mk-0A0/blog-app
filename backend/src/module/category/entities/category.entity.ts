import { Field, ObjectType, PickType } from '@nestjs/graphql';
import { Category as CategoryModel } from '../../../prisma/@generated/prisma-nestjs-graphql/category/category.model';
import { Post } from '../../post/entities/post.entity';

@ObjectType()
export class Category extends PickType(CategoryModel, [
  'id',
  'uuid',
  'name',
  'updatedAt',
  'createdAt',
]) {
  @Field(() => [Post], { description: 'カテゴリーに紐付いている記事' })
  posts?: Post[];
}
