import { ConfigModule, registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';

import { isProduction } from '@server/app.config';
import { UserModel } from '@common/models';

// Normalize variables of this module
export const config = registerAs('user', () => ({
  saltRounds: +process.env.SALT_ROUNDS,
}));

export default {
  // Verifying if exists all variables for this module
  ConfigModule: ConfigModule.forRoot({
    ignoreEnvFile: isProduction(),
    isGlobal: false,
    load: [config],
    validationSchema: Joi.object({
      SALT_ROUNDS: Joi.number().integer().required(),
    }),
  }),

  TypeORMModule: TypeOrmModule.forFeature([UserModel]),
};
