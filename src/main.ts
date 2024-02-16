import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io'; // Import IoAdapter for WebSocket support
import * as cors from 'cors'; // Import cors for CORS support

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 5000;

  // Enable CORS middleware for regular HTTP requests
  app.use(cors({ origin: '*' }));

  // Create HTTP server using NestJS app's internal server
  const server = await app.listen(port);

  // Use IoAdapter for WebSocket connections
  app.useWebSocketAdapter(new IoAdapter(server));

  console.log(`Server started on port ${port}`);
}

bootstrap();
