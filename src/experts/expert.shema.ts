import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsNotEmpty,
  IsNumber,
  ArrayMinSize,
  ArrayMaxSize,
  IsArray,
  IsMongoId,
  Min,
  Max,
} from 'class-validator';
import { User } from '../users/user.schema'; // Import the User interface and schema from the user file

@Schema({ timestamps: true })
export class Expert extends User {
  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  yearsOfExperience: number;

  @IsNumber()
  @IsNotEmpty()
  @Prop({ required: true })
  noOfConsultation: number;

  @Prop()
  averageRating: number;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(10)
  @Prop({ type: [String] })
  educationalQualification: string[];

  @Prop({ type: [String] })
  profilePic: string[];

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(12)
  @Prop({
    type: [String],
    default: Array.from(
      { length: 12 },
      (_, index) => `${12 + index}:00 PM - ${12 + index}:30 PM`,
    ),
    required: true,
  })
  workingTimeSlots: string[];
}

export const ExpertSchema = SchemaFactory.createForClass(Expert);
