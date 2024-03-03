import {User} from '../users/user.schema'; // Import the User interface and schema from the user file
import {Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

// interface Expert extends User {
//     yearsOfExperience: number;
//     noOfConsultation: number;
//     averageRating: number;
//     educationalQualification: string[];
//     workingTimeSlots: string[];
// }


@Schema({ timestamps: true })
export class Expert extends User {
  @Prop({ required: true })
  yearsOfExperience: number;

  @Prop({ required: true })
  noOfConsultation: number;

  @Prop()
  averageRating: number;

  @Prop({ type: [String] })
  educationalQualification: string[];

  @Prop({ type: [String] })
  profilePic: string[];

  @Prop({
    type: [String],
    default: Array.from({ length: 12 }, (_, index) => `${12 + index}:00 PM - ${12 + index}:30 PM`),
    required: true,
  })
  workingTimeSlots: string[];

}

export const ExpertSchema = SchemaFactory.createForClass(Expert);