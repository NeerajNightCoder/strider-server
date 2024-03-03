export class CreateMeetingDto {
  readonly expertId: string;
  readonly clientId: string;
  readonly meetingDate: Date;
  readonly meetingTime: string;
  readonly rating?: number;
  readonly review?: string;
}
