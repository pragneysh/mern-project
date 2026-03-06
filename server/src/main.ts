import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'],
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    app.use(cookieParser());

    app.enableCors({
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    });

    const port = process.env.PORT ?? 3000;

    await app.listen(port);

    console.log('🚀 Server running on port:', port);
  } catch (error) {
    console.error('❌ BOOTSTRAP ERROR:', error);
  }
}

bootstrap(); // ✅ REMOVE `void`
