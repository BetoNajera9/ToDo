import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import {
  UnauthorizedException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

import { AuthResponse, Privileges } from '@auth/enums';
import { UserService } from '@user/user.service';
import { verifyToken } from '@auth/utils';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      Privileges.PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) return true;

    const req = context.switchToHttp().getRequest<Request>();

    const bearerToken = req.headers['authorization'];
    if (!bearerToken)
      throw new UnauthorizedException(AuthResponse.INVALID_TOKEN);

    const token = bearerToken.replace('Bearer ', '');

    const manageToken = verifyToken(token);
    if (!manageToken)
      throw new UnauthorizedException(AuthResponse.INVALID_TOKEN);
    if (manageToken.isExpired)
      throw new UnauthorizedException(AuthResponse.EXPIRED_TOKEN);

    const user = await this.userService.findById(manageToken.sub);
    if (!user) throw new UnauthorizedException(AuthResponse.INVALID_TOKEN);

    req.params.userId = manageToken.sub;

    return true;
  }
}
