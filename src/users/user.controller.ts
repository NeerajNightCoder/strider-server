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
import { UserDTO } from './user-fetch.dto';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(
    @Body('username') username: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ user: User; token: string }> {
    return await this.authService.signUp(username, email, password);
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
    @Body('workingTimeSlots') workingTimeSlots: string,
    @UploadedFile() profilePic,
    @Body() body,
  ): Promise<Types.ObjectId> {
    try {
      // Call the employee service to handle employee sign up
      console.log(JSON.parse(workingTimeSlots));
      console.log(JSON.parse(workingTimeSlots).length);
      const expertId = await this.authService.expertSignUp(
        username,
        email,
        password,
        yearsOfExperience,
        noOfConsultation,
        averageRating,
        educationalQualification,
        profilePic,
        JSON.parse(workingTimeSlots),
      );
      return expertId;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('login')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ user: User; token: string }> {
    console.log(email, password);
    return this.authService.signIn(email, password);
  }
}
