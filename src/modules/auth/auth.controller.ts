import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request & { user: any }) {
    const res = await this.authService.login(req.user);
    return res;
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  async hello(@Req() req: Request & { user: any }) {
    return req.user;
  }
}
