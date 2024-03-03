import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Product = {
  productId: string;
  productName: string;
  productSize: string;
  productPrice: number;
  productQty: number;
};

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true })
  username: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true }) // Reference User schema
  userId: string; // Use ObjectId type for userId

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  shippingAddress: string;

  @Prop({ type: [Object], required: true })
  products: Product[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
