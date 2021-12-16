import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.role);
  }
}

export function matchRoles(roles: string[], roleId: undefined | number) {
  const userRole = roleId && roleId === 1 ? 'admin' : 'user';
  const res = roles.some((r) => {
    return r === userRole;
  });
  if (res) {
    return res;
  } else {
    throw new HttpException('No permission to operate', HttpStatus.FORBIDDEN);
  }
}
