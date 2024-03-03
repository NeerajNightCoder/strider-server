import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['user', 'expert', 'admin', 'owner'],
    default: 'user',
  })
  role: 'user' | 'admin' | 'owner';
}

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);
