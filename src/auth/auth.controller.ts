import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignInDto } from './dto/sign-in.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  signin(@Body() body: SignInDto) {
    return this.authService.signIn(body.username, body.password);
  }
}
