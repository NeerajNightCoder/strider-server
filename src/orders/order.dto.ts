import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  products: Product[];
}

export class Product {
  productId: string;
  productName: string;
  productSize: string;
  productPrice: number;
  productQty: number;
}
