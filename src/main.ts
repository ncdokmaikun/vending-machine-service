import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';
// import { ValidationPipe } from '@nestjs/common';
// import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // const configService = app.get(ConfigService);

  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalFilters(
  //   new HttpExceptionFilter(),
  //   new ValidationExceptionFilter(),
  // );
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');

  // // Enable CORS
  // app.enableCors({
  //   origin: configService.get<string>('localhost:3001'),
  //   credentials: true,
  // });

  await app.listen(3000);
}
bootstrap();
