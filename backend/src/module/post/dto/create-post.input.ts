import { Field, InputType } from '@nestjs/graphql';
import {
  CIsNotEmpty,
  CIsString,
  CLength,
} from '../../../decorators/standardClassValidators';

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: false, description: '記事のタイトル' })
  @CIsNotEmpty('記事のタイトル')
  @CIsString('記事のタイトル')
  @CLength('記事のタイトル', 1, 255)
  title!: string;

  @Field(() => String, { nullable: false, description: '記事の本文' })
  @CIsNotEmpty('記事の本文')
  @CIsString('記事の本文')
  content!: string;

  @Field(() => Boolean, { nullable: true, description: '記事を公開するか' })
  // @CIsBoolean('記事を公開するか')
  isPublished?: boolean;

  @Field(() => [String], {
    nullable: true,
    description: '記事に付けるカテゴリー',
  })
  categoryUuids?: string[];
}
