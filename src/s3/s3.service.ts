import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as AWS from '@aws-sdk/client-s3';

import { config } from './s3.config';
import { TaskModel } from '@common/models';

@Injectable()
export class S3Service {
  private s3: AWS.S3Client;
  private bucket: string;

  constructor(
    @Inject(config.KEY)
    private readonly configS3Service: ConfigType<typeof config>,
  ) {
    const credentials = {
      accessKeyId: this.configS3Service.accessKey,
      secretAccessKey: this.configS3Service.secretKey,
    };

    this.s3 = new AWS.S3Client({
      apiVersion: 'latest',
      region: this.configS3Service.region,
      credentials,
    });
    this.bucket = this.configS3Service.bucket;
  }

  /**
   * Upload file to AWS S3
   * @param  {Express.Multer.File} file
   * @param  {TaskModel} taskData
   * @returns Promise
   */
  public async uploadFile(
    file: Express.Multer.File,
    taskData: TaskModel,
  ): Promise<string> {
    const { originalname, buffer, mimetype } = file;
    const ext = originalname.split('.').pop();
    const key = `${taskData.user}/${taskData.id}.${ext}`;

    const params = new AWS.PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      Body: buffer,
      ContentType: mimetype,
    });

    await this.s3.send(params);

    const encodeFileName = encodeURIComponent(key);
    return `https://${this.bucket}.s3.amazonaws.com/${encodeFileName}`;
  }
  /**
   * Remove file to AWS S3
   * @param  {TaskModel} taskData
   * @returns Promise
   */
  public async removeFile(taskData: TaskModel): Promise<void> {
    const ext = taskData.file.split('.').pop();
    const key = `${taskData.user}/${taskData.id}.${ext}`;

    const params = new AWS.DeleteObjectCommand({
      Bucket: this.bucket,
      Key: key,
    });

    await this.s3.send(params);
  }
}
