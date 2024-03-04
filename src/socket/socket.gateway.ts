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
// Define the interface for client and user names
interface ClientAndUserName {
  [clientId: string]: string;
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

  // Define an object to store clientId and username mappings
  clientIdAndUserName: ClientAndUserName = {};

  // Handle connection event
  handleConnection(client: Socket) {
    console.log(`Client connected on socket gateway: ${client.id}`);
    // Send clientIdAndUserName object to the connected client
    client.emit('clientIdAndUserName', this.clientIdAndUserName);
  }

  // Handle disconnect event
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected on socket gateway: ${client.id}`);
    // You can perform any cleanup or teardown logic here
  }

  // Custom handler for 'message' event
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() payload: any,
  ): void {
    console.log('message');
    // Emit the message back to the client who sent it
    client.emit('message', payload);
    const recipientSocket = this.server.sockets.sockets.get(payload.recipient);
    if (recipientSocket) {
      recipientSocket.emit('message', payload);
    } else {
      console.log(`Recipient '${payload.recipient}' not found`);
    }
  }

  // Custom handler for 'setUsername' event
  @SubscribeMessage('setUsername')
  setUsername(
    @ConnectedSocket() client: CustomSocket,
    @MessageBody() username: string,
  ): void {
    this.clientIdAndUserName[client.id] = username;
    this.server.emit('clientIdAndUserName', this.clientIdAndUserName);
    console.log(`Set username '${username}' for client ${client.id}`);
  }
}
