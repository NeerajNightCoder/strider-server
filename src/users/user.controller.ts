import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './user.service';

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

  @Post('signin')
  async signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    console.log(email, password);
    return this.authService.signIn(email, password);
  }
}
