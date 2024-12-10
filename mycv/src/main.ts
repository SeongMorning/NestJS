import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 필요없는 속성 값이 있어도 무시한다. 사용자가 속성 값을 추가하는 일을 막기 위한 설정
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
