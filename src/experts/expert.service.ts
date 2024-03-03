import { Injectable } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Expert } from './expert.shema';

@Injectable()
export class ExpertService {
  constructor(
    @InjectModel(Expert.name)
    private expertModel: mongoose.Model<Expert>,
  ) {}

  async addexpert(expertData: Expert): Promise<Expert> {
    const expert = await this.expertModel.create(expertData);
    return expert;
  }

  async getAllexperts(): Promise<Expert[]> {
    const experts = await this.expertModel.find();
    return experts;
  }

  async getexpertById(expertId: string): Promise<Expert> {
    const expert = await this.expertModel.findById(expertId);
    return expert;
  }
}
