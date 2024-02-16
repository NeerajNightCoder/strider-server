import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return false; // No Bearer token found in the header
    }

    const token = authHeader.split(' ')[1];
    console.log(token);
    try {
      const decoded = this.jwtService.verify(token);
      console.log(decoded);
      request.user = decoded; // Set the decoded user details on the request object
      return true; // Authentication successful
    } catch (err) {
      console.log(err);
      return false; // Invalid token or token expired
    }
  }
}
