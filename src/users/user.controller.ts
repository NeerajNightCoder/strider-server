import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './user.service';
import { ObjectId } from 'mongoose';
import { Types } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<void> {
    await this.authService.signUp(username, email, password);
  }

  @Post('/expert/signup')
  @UseInterceptors(FileInterceptor('profilePic'))
  async expertSignUp(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('yearsOfExperience') yearsOfExperience: string,
    @Body('noOfConsultation') noOfConsultation: string,
    @Body('averageRating') averageRating: string,
    @Body('educationalQualification') educationalQualification: string[],
    @Body('workingTimeSlots') workingTimeSlots: string[],
    @UploadedFile() profilePic,
    @Body() body,
  ): Promise<Types.ObjectId> {
    try {
      // Call the employee service to handle employee sign up
      const expertId = await this.authService.expertSignUp(
        username,
        email,
        password,
        yearsOfExperience,
        noOfConsultation,
        averageRating,
        educationalQualification,
        profilePic,
        workingTimeSlots,
      );
      return expertId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    console.log(email, password);
    return this.authService.signIn(email, password);
  }
}
