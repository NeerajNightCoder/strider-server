import { IsNotEmpty, IsDateString, IsString, IsMongoId } from 'class-validator';

export class CreateMeetingDto {
  @IsMongoId()
  @IsNotEmpty()
  expertId: string;
  @IsNotEmpty()
  expertName: string;

  @IsMongoId()
  @IsNotEmpty()
  clientId: string;

  @IsDateString()
  @IsNotEmpty()
  meetingDate: string;

  @IsString()
  @IsNotEmpty()
  meetingTime: string;

  rating?: number;

  review?: string;
}
