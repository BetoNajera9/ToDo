import { Global, Module } from '@nestjs/common';

import { UserModule } from '@user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import Config from './auth.config';

@Global()
@Module({
  imports: [Config.ConfigModule, UserModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
