import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meeting, MeetingDocument } from './meeting.schema';
import { CreateMeetingDto } from './create-meeting.dto';

@Injectable()
export class MeetingService {
  constructor(
    @InjectModel(Meeting.name) private meetingModel: Model<MeetingDocument>,
  ) {}

  async createMeeting(meetingDto: CreateMeetingDto): Promise<Meeting> {
    const createdMeeting = new this.meetingModel(meetingDto);
    return createdMeeting.save();
  }

  async getAllMeetings(): Promise<Meeting[]> {
    return this.meetingModel.find().exec();
  }

  async getMeetingById(meetingId: string): Promise<Meeting> {
    const meeting = await this.meetingModel.findById(meetingId).exec();
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }
}
