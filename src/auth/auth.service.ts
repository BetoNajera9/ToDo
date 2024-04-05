import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { UserService } from '@user/user.service';
import { UserModel } from '@common/models';

import { AuthResponse, Payload, SignToken } from './interfaces';
import { config } from './auth.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(config.KEY)
    private readonly configAuthService: ConfigType<typeof config>,
  ) {}

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserModel> {
    const userData = await this.userService.find({ email });

    if (userData) {
      const matchPassword = await bcrypt.compare(password, userData.password);

      if (matchPassword) return userData;
    }

    return null;
  }

  public signToken({ payload, secret, expires }: SignToken): string {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateToken(user: UserModel): Promise<AuthResponse> {
    const getUser = await this.userService.findById(user.id);

    const payload: Payload = {
      name: getUser.name,
      lastName: getUser.lastName,
      sub: getUser.id,
    };

    return {
      accessToken: this.signToken({
        expires: this.configAuthService.jwtExpires,
        secret: this.configAuthService.jwtSecret,
        payload,
      }),
      user,
    };
  }
}
