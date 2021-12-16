import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SysUserService } from '../sys/sys-user/sys-user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly sysUserService: SysUserService,
  ) {}

  async validateUser(username: string, password: string) {
    const user = await this.sysUserService.findByName(username, true);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      nickname: user.nickname,
      email: user.email,
      id: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      nickname: user.nickname,
      username: user.username,
      email: user.email,
    };
  }
}
