import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './create-meeting.dto';
import { Meeting } from './meeting.schema';

@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Post()
  async create(@Body() createMeetingDto: CreateMeetingDto): Promise<Meeting> {
    return this.meetingService.createMeeting(createMeetingDto);
  }

  @Get()
  async findAll(): Promise<Meeting[]> {
    return this.meetingService.getAllMeetings();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Meeting> {
    return this.meetingService.getMeetingById(id);
  }
}
