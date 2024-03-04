import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expert } from './expert.shema';
import { ExpertDTO } from './expert-fetch.dto';

@Injectable()
export class ExpertService {
  constructor(
    @InjectModel(Expert.name)
    private expertModel: Model<Expert>, // Use Model<Expert> instead of mongoose.Model<Expert>
  ) {}

  async addExpert(expertData: Expert): Promise<Expert> {
    console.log(expertData);
    const expert = await this.expertModel.create(expertData);
    return expert;
  }

  async getAllExperts(): Promise<ExpertDTO[]> {
    const experts = await this.expertModel.find<ExpertDTO>(
      {},
      {
        _id: 1,
        username: 1,
        email: 1,
        yearsOfExperience: 1,
        noOfConsultation: 1,
        averageRating: 1,
        educationalQualification: 1,
        profilePic: 1,
        availableTimeSlots: 1,
      },
    );
    return experts;
  }

  async getExpertById(expertId: string): Promise<ExpertDTO> {
    const expert = await this.expertModel.findById<ExpertDTO>(expertId, {
      _id: 1,
      username: 1,
      email: 1,
      yearsOfExperience: 1,
      noOfConsultation: 1,
      averageRating: 1,
      educationalQualification: 1,
      profilePic: 1,
      availableTimeSlots: 1,
    });
    return expert;
  }
}
