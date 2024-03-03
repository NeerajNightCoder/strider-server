import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @Prop({ required: true })
  password: string;

  @IsString()
  @IsNotEmpty()
  @IsIn(['user', 'expert', 'admin', 'owner'])
  @Prop({
    type: String,
    enum: ['user', 'expert', 'admin', 'owner'],
    default: 'user',
  })
  role: 'user' | 'admin' | 'owner';
}

export const UserSchema = SchemaFactory.createForClass(User);
