import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../prisma/prisma.service';

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

  create(_createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, _updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
