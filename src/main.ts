import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`App running on http://localhost:${process.env.PORT ?? 3000}`);
}

await bootstrap();
