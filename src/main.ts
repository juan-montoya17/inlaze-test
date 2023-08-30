import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors({ origin: '*', methods: 'POST,GET,HEAD,PUT,PATCH,DELETE' });
  app.useGlobalPipes(
    // See documentation: https://docs.nestjs.com/techniques/validation
    new ValidationPipe({
      stopAtFirstError: true,
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT);
}
bootstrap().then(() => {
  console.log(`Server started on: http://localhost:${process.env.PORT}/api`);
});
