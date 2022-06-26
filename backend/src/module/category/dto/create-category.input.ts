import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: false, description: 'カテゴリー名' })
  name!: string;
}
