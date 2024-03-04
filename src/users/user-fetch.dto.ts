import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsIn,
} from 'class-validator';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class UserDTO {
  @IsNotEmpty()
  _id: ObjectId;

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
  @IsIn(['user', 'expert', 'admin', 'owner'])
  role: string;
}
