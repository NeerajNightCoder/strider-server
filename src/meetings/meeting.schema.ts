import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsMongoId,
  Min,
  Max,
} from 'class-validator';

export type MeetingDocument = Meeting & Document;

@Schema({ timestamps: true })
export class Meeting {
  @IsMongoId()
  @IsNotEmpty()
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  expertId: string;

  @IsNotEmpty()
  @Prop({ required: true })
  expertName: string;

  @IsMongoId()
  @IsNotEmpty()
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  @Prop({ required: true })
  meetingDate: string;

  @IsString()
  @IsNotEmpty()
  @Prop({ required: true })
  meetingTime: string;

  @Min(0)
  @Max(5)
  @Prop({ type: Number })
  rating: number;

  @Prop()
  review: string;

  // Add the status field with default value
  @IsString()
  @IsNotEmpty()
  @Prop({ default: 'pending' }) // Set default value to 'awaiting'
  status: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
