import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, registerAs } from '@nestjs/config';
import { LoggerModule, Params } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import * as Joi from 'joi';

import { version, name } from '../package.json';

/** Constant to identify the server environment */
const environment = () => process.env.NODE_ENV ?? '';

// Constant used to identify if the server is in production mode
export const isProduction = () => process.env.API_ENVIRONMENT === 'production';

/** Constant to identify the Log provider */
export const SERVER_LOGS = 'SERVER_LOGS';

// Normalize the variables of the API
export const config = registerAs('api', () => ({
  dbPassword: process.env.POSTGRES_PASSWORD,
  dbUser: process.env.POSTGRES_USER,
  dbName: process.env.POSTGRES_DB,
  dbHost: process.env.POSTGRES_HOST,
  dbPort: +process.env.POSTGRES_PORT,
}));

export default {
  // Verifying if exists all variables for the API
  ConfigModule: ConfigModule.forRoot({
    ignoreEnvFile: isProduction(),
    isGlobal: true,
    load: [config],
    validationSchema: Joi.object({
      POSTGRES_USER: Joi.string().required(),
      POSTGRES_PASSWORD: Joi.string().required(),
      POSTGRES_DB: Joi.string().required(),
      POSTGRES_HOST: Joi.string().required(),
      POSTGRES_PORT: Joi.number().port().required(),
    }),
  }),

  // Instance of the TypeORMModule
  TypeORMModule: TypeOrmModule.forRoot({
    type: 'postgres',
    host: config().dbHost,
    port: config().dbPort,
    username: config().dbUser,
    password: config().dbPassword,
    database: config().dbName,
    entities: [join(__dirname, '**', '*.model.{ts,js}')],
    synchronize: true,
    migrationsRun: false,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
  }),

  // Initializing a LoggerModule instance
  LoggerModule: LoggerModule.forRoot({
    pinoHttp: {
      name: `${name}-${environment()}-v${version}`,
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
          translateTime: 'dd-mm-yyyy HH:MM:ss',
          ignore: 'req',
          messageFormat: '{msg}',
        },
      },
    },
  }),
};
