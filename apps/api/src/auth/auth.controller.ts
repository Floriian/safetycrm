import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { Public } from './decorators/public.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { JwtPayload } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @Public()
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Get('me')
  me(@GetUser() user: JwtPayload) {
    return this.authService.me(user.sub);
  }
}
