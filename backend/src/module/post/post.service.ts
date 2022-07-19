import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../user/entities/user.entity';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  //TODO: カテゴリーの有無を検証する
  create(currentUser: User, createPostInput: CreatePostInput) {
    const { content, title, isPublished, categoryUuids } = createPostInput;
    return this.prisma.post.create({
      data: {
        content,
        title,
        isPublished: typeof isPublished === 'undefined' ? false : isPublished,
        publishedAt: isPublished ? new Date() : null,
        categories: {
          connect: categoryUuids?.map((uuid) => ({ uuid })),
        },
        author: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  //TODO: カテゴリーの有無を検証する
  //TODO: isPublishedがtrueのときにpublishedAtを設定する
  update(uuid: string, updatePostInput: UpdatePostInput) {
    const { title, content, categoryUuids, isPublished } = updatePostInput;
    return this.prisma.post.update({
      data: {
        title,
        content,
        isPublished: typeof isPublished === 'undefined' ? false : isPublished,
        categories: {
          connect: categoryUuids?.map((uuid) => ({ uuid })),
        },
        updatedAt: new Date(),
      },
      where: {
        uuid,
      },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  //TODO 削除後の返り値を設定する
  async delete(uuid: string) {
    const hasPost = await this.prisma.post.findUnique({
      where: {
        uuid,
      },
    });

    if (!hasPost) {
      //TODO: エラーハンドリングをきちんとする
      throw new Error('Post not found');
    }

    return this.prisma.post.delete({
      where: {
        uuid,
      },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  findAll(currentUser: User) {
    return this.prisma.post.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      where: {
        authorId: currentUser.id,
      },
      include: {
        author: true,
        categories: true,
      },
    });
  }

  findOne(currentUser: User, uuid: string) {
    return this.prisma.post.findFirst({
      where: {
        authorId: currentUser.id,
        uuid,
      },
      include: {
        author: true,
      },
    });
  }
}
