import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  productName: string;
  @Prop({ required: true })
  sizes: { size: string; price: number; offerPrice: number }[];
  @Prop({ type: [String] })
  images: [string];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
