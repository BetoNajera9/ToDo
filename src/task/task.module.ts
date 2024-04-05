import { Module } from '@nestjs/common';

import { UserModule } from '@user/user.module';

import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import Config from './task.config';

@Module({
  imports: [UserModule, Config.ConfigModule, Config.TypeORMModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
