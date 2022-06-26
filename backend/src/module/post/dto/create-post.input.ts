import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field(() => String, { nullable: false, description: '記事のタイトル' })
  title!: string;

  @Field(() => String, { nullable: false, description: '記事の本文' })
  content!: string;

  @Field(() => Boolean, { nullable: true, description: '記事を公開するか' })
  isPublished?: boolean;

  @Field(() => [String], {
    nullable: true,
    description: '記事に付けるカテゴリー',
  })
  categoryUuids?: string[];
}
