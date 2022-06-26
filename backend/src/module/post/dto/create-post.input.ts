import { Field, InputType } from '@nestjs/graphql';
import { CreateCategoryInput } from '../../category/dto/create-category.input';

@InputType()
export class CreatePostInput {
  @Field(() => Date, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: false })
  content!: string;

  @Field(() => Boolean, { nullable: true })
  isPublished?: boolean;

  @Field(() => Date, { nullable: true })
  publishedAt?: Date;

  @Field(() => CreateCategoryInput, { nullable: true })
  categories?: CreateCategoryInput;
}
