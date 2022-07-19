import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoryInput: CreateCategoryInput) {
    const { name } = createCategoryInput;
    return this.prisma.category.create({
      data: {
        name,
      },
      include: {
        posts: true,
      },
    });
  }

  update(uuid: string, updateCategoryInput: UpdateCategoryInput) {
    const { name } = updateCategoryInput;
    return this.prisma.category.update({
      data: {
        name,
        updatedAt: new Date(),
      },
      where: {
        uuid,
      },
      include: {
        posts: true,
      },
    });
  }

  delete(uuid: string) {
    return this.prisma.category.delete({
      where: {
        uuid,
      },
      include: {
        posts: true,
      },
    });
  }

  findAll() {
    return this.prisma.category.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  findOne(uuid: string) {
    return this.prisma.category.findUnique({
      where: {
        uuid,
      },
    });
  }
}
