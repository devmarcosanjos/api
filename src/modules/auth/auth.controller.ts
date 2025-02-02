import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from 'src/modules/auth/dtos/signup.dto';
import { SigninDto } from 'src/modules/auth/dtos/signin.dto';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signin(@Body() signinDto: SigninDto) {
    return this.authService.signin(signinDto);
  }

  @Post('signup')
  create(@Body() signupDto: SignupDto) {
    return this.authService.signup(signupDto);
  }
}
