import { IsNotEmpty, IsDateString, IsString, IsMongoId } from 'class-validator';

export class CreateMeetingDto {
  @IsMongoId()
  @IsNotEmpty()
  expertId: string;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  meetingDate: Date;

  @IsString()
  @IsNotEmpty()
  meetingTime: string;

  rating?: number;

  review?: string;
}
