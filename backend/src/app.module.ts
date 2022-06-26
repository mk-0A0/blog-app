import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PostModule } from './module/post/post.module';
import { CategoryModule } from './module/category/category.module';
import { UserModule } from './module/user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    PostModule,
    CategoryModule,
    UserModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
