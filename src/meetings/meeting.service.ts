import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './meeting.schema';
import { CreateMeetingDto } from './create-meeting.dto';
import { Expert, ExpertDocument } from '../experts/expert.shema'; // Corrected typo in the import statement

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
    @InjectModel(Expert.name) private expertModel: Model<ExpertDocument>,
  ) {}

  async createMeeting(meetingDto: CreateMeetingDto): Promise<Meeting> {
    // Check if the time slot is available
    const expert = await this.expertModel.findById(meetingDto.expertId);
    if (!expert) {
      throw new NotFoundException('Expert not found');
    }

    const { meetingDate, meetingTime } = meetingDto;

    const timeSlotIndex = expert.availableTimeSlots.findIndex(
      (slot) =>
        slot.date === meetingDate && slot.timeSlots.includes(meetingTime),
    );

    if (timeSlotIndex === -1) {
      throw new BadRequestException('The selected time slot is not available');
    }

    // If the time slot is available, create the meeting
    const createdMeeting = new this.meetingModel(meetingDto);
    const savedMeeting = await createdMeeting.save();

    // Remove the booked time slot from the expert's availableTimeSlots
    expert.availableTimeSlots[timeSlotIndex].timeSlots =
      expert.availableTimeSlots[timeSlotIndex].timeSlots.filter(
        (slot) => slot !== meetingTime,
      );

    await expert.save();

    return savedMeeting;
  }

  async getAllMeetings(): Promise<Meeting[]> {
    return this.meetingModel.find().exec();
  }
  async getClientMeetings(clientId: string): Promise<Meeting[]> {
    return this.meetingModel.find({ clientId }).exec();
  }
  async getMeetingById(meetingId: string): Promise<Meeting> {
    const meeting = await this.meetingModel.findById(meetingId).exec();
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }
}
