import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  size: string;
  @Prop({ type: [String] })
  images: [string];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
