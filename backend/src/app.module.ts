import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PostModule } from './module/post/post.module';
import { CategoryModule } from './module/category/category.module';
import { UserModule } from './module/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './module/auth/auth.module';

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
    PrismaModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
