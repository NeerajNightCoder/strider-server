import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
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
    return user;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      console.log('Invalid credentials' + email);
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid credentials' + password);
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user._id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }
}
