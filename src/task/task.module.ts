import { Module } from '@nestjs/common';

import { UserModule } from '@user/user.module';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import Config from './task.config';
import { S3Module } from '@server/s3/s3.module';
import { S3Service } from '@server/s3/s3.service';

@Module({
  imports: [UserModule, S3Module, Config.ConfigModule, Config.TypeORMModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
