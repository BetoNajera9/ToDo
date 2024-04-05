import { Module } from '@nestjs/common';

import { S3Service } from './s3.service';
import Config from './s3.config';

@Module({
  imports: [Config.ConfigModule],
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {}
