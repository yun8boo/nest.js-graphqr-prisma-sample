import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('current-user')
export class CurrentUserController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@Request() { user: { iat, exp, ...other } }) {
    return other;
  }
}
