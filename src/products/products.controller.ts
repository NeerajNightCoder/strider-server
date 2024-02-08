import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

import { v4 as uuidv4 } from 'uuid';
@Controller('/products')
export class ProductController {
  constructor(private productService: ProductService) {}
  @Post()
  addProduct(
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('size') size: string,
    @Body('images') images: [string],
  ): any {
    const productId = this.productService.addProduct({
      name,
      price,
      size,
      images,
    });
    return productId;
  }

  @Get()
  async getAllProducts(): Promise<Product[]> {
    const products = await this.productService.getAllProducts();
    return products;
  }

  @Get('/:productId')
  async getProductById(@Param('productId') productId): Promise<Product> {
    const product = await this.productService.getProductById(productId);
    return product;
  }
}
