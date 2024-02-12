import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product, ProductSchema } from './product.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    JwtModule.register({
      secret: 'secret', // You should replace this with your actual secret key
      signOptions: { expiresIn: '1h' }, // Adjust the expiration time as needed
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
