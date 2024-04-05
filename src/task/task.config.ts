import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { HistoryModel, TaskModel } from '@common/models';
import { isProduction } from '@server/app.config';

export default {
  // Verifying if exists all variables for this module
  ConfigModule: ConfigModule.forRoot({
    ignoreEnvFile: isProduction(),
    isGlobal: false,
  }),

  TypeORMModule: TypeOrmModule.forFeature([TaskModel, HistoryModel]),
};
