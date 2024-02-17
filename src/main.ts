import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port =  443;

  // Enable CORS middleware for regular HTTP requests
  app.use(cors({ origin: '*' }));

  // Create HTTP server using NestJS app's internal server
  const server = await app.listen(port);

  // Use IoAdapter for WebSocket connections
  app.useWebSocketAdapter(new IoAdapter(server));

  console.log(`Server started on port ${port}`);
}

bootstrap();
