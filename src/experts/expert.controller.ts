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
  @Controller('/experts')
  export class ExpertController {
    constructor(private expertService: ExpertService) {}
  
    @Get()
    async getAllExperts(): Promise<Expert[]> {
      console.log('get all Experts');
      const experts = await this.expertService.getAllexperts();
      return experts;
    }
  
    @Get('/:expertId')
    async getexpertById(@Param('expertId') expertId): Promise<Expert> {
      const expert = await this.expertService.getexpertById(expertId);
      return expert;
    }
  }
  