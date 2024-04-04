import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import Config from './app.config';

@Module({
  imports: [
    Config.TypeORMModule,
    Config.ConfigModule,
    Config.LoggerModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
