import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';
import { UpdateCategoryInput } from './dto/update-category.input';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}
  @Mutation(() => Category, { description: 'カテゴリーを作成する' })
  async createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => Category, { description: 'カテゴリーを更新する' })
  async updateCategory(
    @Args('uuid') uuid: string,
    @Args('input') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(uuid, updateCategoryInput);
  }

  @Mutation(() => Category, { description: 'カテゴリーを削除する' })
  deleteCategory(@Args('uuid') uuid: string) {
    return this.categoryService.delete(uuid);
  }

  @Query(() => [Category], { description: 'カテゴリーを複数取得する' })
  categories() {
    return this.categoryService.findAll();
  }

  @Query(() => Category, { description: 'uuidからカテゴリーを取得する' })
  category(@Args('uuid') uuid: string) {
    return this.categoryService.findOne(uuid);
  }
}
