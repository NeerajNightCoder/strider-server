import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import * as cors from 'cors';
import { AuthController } from './users/user.controller';
import { AuthService } from './users/user.service';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './users/user.schema';
import { SocketGateway } from './socket/socket.gateway';
import { Expert, ExpertSchema } from './experts/expert.shema';
import { ExpertController } from './experts/expert.controller';
import { ExpertService } from './experts/expert.service';
import { Order, OrderSchema } from './orders/orders.schema';
import { OrderController } from './orders/order.controller';
import { OrderService } from './orders/order.service';
@Module({
  imports: [
    ProductModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb+srv://Neerajistheboss:Neerajis%231@cluster0-m2lq9.mongodb.net/Strider?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Expert.name, schema: ExpertSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    JwtModule.register({ secret: 'secret' }),
  ],
  controllers: [
    AppController,
    AuthController,
    ExpertController,
    OrderController,
  ],
  providers: [
    AppService,
    AuthService,
    ExpertService,
    OrderService,
    SocketGateway,
  ],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(cors({ origin: 'http://localhost:3000' }))
  //     .forRoutes({ path: '*', method: RequestMethod.ALL });
  // }
}
