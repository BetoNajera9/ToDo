import { Module } from '@nestjs/common';

import { AuthModule } from '@auth/auth.module';
import { UserModule } from '@user/user.module';
import { TaskModule } from '@task/task.module';
import { S3Module } from '@s3/s3.module';

import Config from './app.config';

@Module({
  imports: [
    Config.TypeORMModule,
    Config.ConfigModule,
    Config.LoggerModule,
    AuthModule,
    UserModule,
    TaskModule,
    S3Module,
  ],
})
export class AppModule {}
