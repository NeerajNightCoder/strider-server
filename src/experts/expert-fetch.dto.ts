import { IsNotEmpty, IsString, IsArray, ArrayMinSize } from 'class-validator';
import { ObjectId } from 'mongoose';

class TimeSlot {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsArray()
  @ArrayMinSize(1)
  timeSlots: string[];
}

export class ExpertDTO {
  @IsNotEmpty()
  _id: ObjectId;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  yearsOfExperience: number;

  noOfConsultation: number;

  averageRating: number;

  @IsArray()
  @ArrayMinSize(1)
  educationalQualification: string[];

  @IsArray()
  @ArrayMinSize(1)
  profilePic: string[];

  @IsArray()
  @ArrayMinSize(1)
  availableTimeSlots: TimeSlot[];
}
