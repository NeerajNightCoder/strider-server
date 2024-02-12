import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ['user', 'admin', 'owner'], default: 'user' })
  role: 'user' | 'admin' | 'owner';
}

export const UserSchema = SchemaFactory.createForClass(User);
