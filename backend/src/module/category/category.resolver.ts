import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CreateCategoryInput } from './dto/create-category.input';
import { Category } from './entities/category.entity';
import { UpdateCategoryInput } from './dto/update-category.input';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Mutation(() => Category, { description: 'カテゴリーを作成する' })
  @UseGuards(JwtAuthGuard)
  async createCategory(
    @Args('input') createCategoryInput: CreateCategoryInput,
  ) {
    return this.categoryService.create(createCategoryInput);
  }

  @Mutation(() => Category, { description: 'カテゴリーを更新する' })
  @UseGuards(JwtAuthGuard)
  async updateCategory(
    @Args('uuid') uuid: string,
    @Args('input') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(uuid, updateCategoryInput);
  }

  @Mutation(() => Category, { description: 'カテゴリーを削除する' })
  @UseGuards(JwtAuthGuard)
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
