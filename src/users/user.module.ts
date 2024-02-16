import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './user.service';
import { AuthController } from './user.controller';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: 'secret', // You should replace this with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
