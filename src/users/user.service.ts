import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from './user.schema';
import { Expert } from '../experts/expert.shema';
import * as AWS from 'aws-sdk';

@Injectable()
export class AuthService {
  fileType = 'image/jpeg'; // Content type for JPEG files
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Expert.name) private expertModel: Model<Expert>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    // Check if a user with the provided email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      // If a user with the email already exists, throw a ConflictException
      throw new ConflictException('Email already exists');
    }

    // If the email is not already registered, proceed with user creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    user.password = null;
    const { _id, role } = user;
    const token = this.jwtService.sign({ userId: _id, role, username, email });

    return { user, token };
  }

  async expertSignUp(
    username: string,
    email: string,
    password: string,
    yearsOfExperience: string,
    noOfConsultation: string,
    averageRating: string,
    educationalQualification: string[],
    profilePic: any,
    workingTimeSlots: string[],
  ): Promise<Types.ObjectId> {
    // Check if a user with the provided email already exists
    const existingUser = await this.expertModel.findOne({ email });
    if (existingUser) {
      // If a user with the email already exists, throw a ConflictException
      throw new ConflictException('Email already exists');
    }

    // If the email is not already registered, proceed with user creation
    const hashedPassword = await bcrypt.hash(password, 10);
    const fileType = 'image/jpeg'; // Content type for JPEG files
    // Upload profile picture to AWS S3
    const s3 = new AWS.S3({
      // Configure AWS credentials and region here
      accessKeyId: process.env.accessKeyId,
      secretAccessKey: process.env.secretAccessKey,
      region: process.env.region,
    });

    const uploadParams = {
      Bucket: 'expert-bucket-talk',
      Key: `profile-pictures/${username}-${Date.now()}`, // Key is the path where the file will be stored in S3
      Body: profilePic.buffer,
      ACL: 'public-read', // Set ACL to allow public read access
      ContentType: fileType,
    };

    const s3UploadResponse = await s3.upload(uploadParams).promise();
    const profilePicUrl = s3UploadResponse.Location;
    function getNextSevenDays(): string[] {
      const dates: string[] = [];
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() + i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates;
    }

    const nextSevenDays = getNextSevenDays();
    const availableTimeSlots = nextSevenDays.map((date) => {
      return {
        date: date,
        timeSlots: workingTimeSlots,
      };
    });

    const expert = await this.expertModel.create({
      username,
      email,
      password: hashedPassword,
      yearsOfExperience,
      noOfConsultation,
      averageRating,
      educationalQualification,
      profilePic: profilePicUrl,
      availableTimeSlots,
      defaultWorkingTimeSlots: workingTimeSlots,
    });
    return new Types.ObjectId(expert._id);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    const user = await this.userModel.findOne({ email });
    console.log('user cred', email, password);
    if (!user) {
      console.log('Invalid credentials' + email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid credentials' + password);
      throw new UnauthorizedException('Invalid credentials');
    }

    const { _id, role, username } = user;
    user.password = null;
    const token = this.jwtService.sign({
      userId: _id,
      role,
      username,
      email,
    });

    return { user, token };
  }
}
