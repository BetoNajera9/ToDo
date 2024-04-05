import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import { isProduction } from '@server/app.config';

// Normalize variables of this module
export const config = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET,
  jwtExpires: process.env.JWT_EXPIRES,
}));

export default {
  // Verifying if exists all variables for this module
  ConfigModule: ConfigModule.forRoot({
    ignoreEnvFile: isProduction(),
    isGlobal: false,
    load: [config],
    validationSchema: Joi.object({
      JWT_SECRET: Joi.string().required(),
      JWT_EXPIRES: Joi.string().required(),
    }),
  }),
};
