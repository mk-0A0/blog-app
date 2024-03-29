import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      /**
       * エラーの返り値にkeyをもたせる
       * @example
       * {
       *   "errors": [
       *     {
       *       "message": "Bad Request Exception",
       *       "extensions": {
       *         "code": "BAD_USER_INPUT",
       *         "response": {
       *           "statusCode": 400,
       *           "message": [
       *             {
       *               "key": "title",
       *               "messages": [
       *                 "title should not be empty"
       *               ]
       *             },
       *             {
       *               "key": "description",
       *               "messages": [
       *                 "description must not be less than 10",
       *                 "description should not be empty"
       *               ]
       *             }
       *           ],
       *           "error": "Bad Request"
       *         }
       *       }
       *     }
       *   ],
       *   "data": null
       * }
       */
      exceptionFactory: (errors): ValidationError[] => {
        const messages = errors
          .map((error) => {
            const constraint = error.constraints;

            if (!constraint) {
              return null;
            }
            const messages = Object.values(constraint).map((n) => n);
            return {
              key: error.property,
              messages,
            };
          })
          .filter((n): n is { key: string; messages: string[] } => Boolean(n));
        throw new BadRequestException(messages);
      },
    }),
  );
  await app.listen(4000);
}
bootstrap();
