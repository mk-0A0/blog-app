import { Field, InputType } from '@nestjs/graphql';
import {
  CIsNotEmpty,
  CIsString,
  CLength,
} from '../../../decorators/standardClassValidators';

@InputType()
export class CreateCategoryInput {
  @Field(() => String, { nullable: false, description: 'カテゴリー名' })
  @CIsNotEmpty('カテゴリー名')
  @CIsString('カテゴリー名')
  @CLength('カテゴリー名', 1, 255)
  name!: string;
}
