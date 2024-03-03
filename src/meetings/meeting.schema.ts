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

@Schema()
export class Meeting {
  @IsMongoId()
  @IsNotEmpty()
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  expertId: string;

  @IsMongoId()
  @IsNotEmpty()
  @Prop({ type: 'ObjectId', ref: 'User', required: true })
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  @Prop({ required: true })
  meetingDate: Date;

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
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
