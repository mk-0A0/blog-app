import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async getSeedUser() {
    const user = await this.prisma.user.findUnique({
      where: {
        email: 'user@example.com',
      },
    });

    if (!user) {
      throw new HttpException(
        'ユーザーが存在しません。seedを実行してください',
        HttpStatus.CONFLICT,
      );
    }

    return user;
  }

  async findByUuid(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid,
      },
    });

    if (!user) {
      throw new HttpException('ユーザーは存在しません。', HttpStatus.CONFLICT);
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        'ユーザーが存在しません。seedを実行してください',
        HttpStatus.CONFLICT,
      );
    }

    return user;
  }

  async create(createUserInput: CreateUserInput) {
    const { email, name, password } = createUserInput;

    const hasUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (hasUser) {
      throw new HttpException(
        '既に使用されているメールアドレスです。',
        HttpStatus.CONFLICT,
      );
    }

    return await this.prisma.user.create({
      data: {
        name,
        password: await hash(password, 10),
        email,
      },
    });
  }
}
