import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  create(currentUser: User, createPostInput: CreatePostInput) {
    return this.prisma.post.create({
      data: {
        ...createPostInput,
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

  findAll(currentUser: User) {
    return this.prisma.post.findMany({
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
