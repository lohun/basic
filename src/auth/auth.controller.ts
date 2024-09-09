import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthDto } from '../dtos/auth.dto';
import { AuthService } from './auth.service';
import { UpdateDTO } from '../dtos/upat.dt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  register(@Body() param: AuthDto) {
    return this.authService.register(param);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() param: UpdateDTO) {
    return this.authService.login(param);
  }
}
