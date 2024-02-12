import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

import { v4 as uuidv4 } from 'uuid';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async addProduct(
    @Body('productName') productName: string,
    @Body('sizes') sizes: [{ size: string; price: string; offerPrice: string }],
    @Body('images') images: [string],
  ): Promise<any> {
    // Convert price and offerPrice to numbers using ParseIntPipe
    const parsedSizes = await Promise.all(
      sizes.map(async (size) => ({
        ...size,
        price: await new ParseIntPipe().transform(size.price, {
          type: 'query',
        }),
        offerPrice: await new ParseIntPipe().transform(size.offerPrice, {
          type: 'query',
        }),
      })),
    );

    const productId = this.productService.addProduct({
      productName,
      sizes: parsedSizes,
      images,
    });
    return productId;
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    console.log('get all products');
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get('/:productId')
  async getProductById(@Param('productId') productId): Promise<Product> {
    const product = await this.productService.getProductById(productId);
    return product;
  }
}
