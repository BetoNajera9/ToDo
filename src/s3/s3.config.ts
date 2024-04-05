import { ConfigModule, registerAs } from '@nestjs/config';
import * as Joi from 'joi';

import { isProduction } from '@server/app.config';

// Normalize variables of this module
export const config = registerAs('s3', () => ({
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  region: process.env.S3_REGION,
  bucket: process.env.S3_BUCKET,
}));

export default {
  // Verifying if exists all variables for this module
  ConfigModule: ConfigModule.forRoot({
    ignoreEnvFile: isProduction(),
    isGlobal: false,
    load: [config],
    validationSchema: Joi.object({
      S3_ACCESS_KEY: Joi.string().required(),
      S3_SECRET_KEY: Joi.string().required(),
      S3_REGION: Joi.string().required(),
      S3_BUCKET: Joi.string().required(),
    }),
  }),
};
