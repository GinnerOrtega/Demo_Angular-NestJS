import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Todas las rutas quedan bajo /api
  app.setGlobalPrefix('api');

  // El frontend consume la API
  app.enableCors({ origin: 'http://localhost:4200' });

  // Valida los DTO
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API Piedrazul escuchando en http://localhost:${port}/api`);
}
await bootstrap();
