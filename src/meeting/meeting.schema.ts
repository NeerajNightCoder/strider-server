import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MeetingDocument = Meeting & Document;

@Schema()
export class Meeting {
  @Prop({ type: 'ObjectId', ref: 'User', required: true }) // Reference Expert schema
  expertId: string;

  @Prop({ type: 'ObjectId', ref: 'User', required: true }) // Reference Client schema
  clientId: string;

  @Prop({ required: true })
  meetingDate: Date;

  @Prop({ required: true })
  meetingTime: string;

  @Prop({ type: Number, min: 0, max: 5 })
  rating: number;

  @Prop()
  review: string;
}

export const MeetingSchema = SchemaFactory.createForClass(Meeting);
