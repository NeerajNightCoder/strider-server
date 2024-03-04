import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Expert } from './expert.shema';
import { ExpertService } from './expert.service';
import { ExpertDTO } from './expert-fetch.dto';
@Controller('/experts')
export class ExpertController {
  constructor(private expertService: ExpertService) {}

  @Get()
  async getAllExperts(): Promise<ExpertDTO[]> {
    console.log('get all Experts');
    const experts = await this.expertService.getAllExperts();
    return experts;
  }

  @Get('/:expertId')
  async getexpertById(@Param('expertId') expertId): Promise<ExpertDTO> {
    const expert = await this.expertService.getExpertById(expertId);
    return expert;
  }
}
