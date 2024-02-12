import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
interface CustomSocket extends Socket {
  username?: string; // Add the 'username' property
}
const options = {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
};
@WebSocketGateway(options)
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  // Handle connection event
  handleConnection(client: Socket) {
    console.log(`Client connected on socket gateway: ${client.id}`);
    // You can perform any initialization or setup logic here
  }

  // Handle disconnect event
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected on socket gateway: ${client.id}`);
    // You can perform any cleanup or teardown logic here
  }

  // Custom handler for 'message' event
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): void {
    console.log('message');
    this.server.emit('message', payload);
  }

  // Custom handler for 'setUsername' event
  @SubscribeMessage('setUsername')
  setUsername(client: CustomSocket, username: string): void {
    console.log(`Set username '${username}' for client ${client.id}`);
    client.username = username; // Now TypeScript recognizes the 'username' property
  }
}
