import { Injectable } from '@nestjs/common';
// import { Product } from './product.model';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/products/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async addProduct(productData: Product): Promise<Product> {
    const product = await this.productModel.create(productData);
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProductById(productId: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    return product;
  }
}
