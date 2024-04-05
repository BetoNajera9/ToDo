import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { HistoryModel, TaskModel, UserModel } from '@common/models';
import { PageDTO, PageMetaDTO, PageOptionsDTO } from '@common/dto';
import { TaskActionEnum } from '@task/enums';
import { S3Service } from '@s3/s3.service';

import { CreateTaskDTO, EditTaskDTO } from './dto';
import { History } from './interfaces';
import path from 'path';
import { TaskResponse } from './enums';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private readonly taskRepository: Repository<TaskModel>,
    @InjectRepository(HistoryModel)
    private readonly historyRepository: Repository<HistoryModel>,
    @Inject(S3Service) private readonly s3Service: S3Service,
  ) {}

  public async findAll(
    pageOptions: PageOptionsDTO,
  ): Promise<PageDTO<TaskModel>> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    queryBuilder
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.status',
        'task.createdAt',
      ])
      .leftJoinAndSelect('task.user', 'user')
      .orderBy('task.createdAt', pageOptions.order)
      .skip(pageOptions.skip)
      .take(pageOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDTO({
      itemCount,
      pageOptionsDto: pageOptions,
    });

    return new PageDTO(entities, pageMetaDto);
  }

  public async findMyTask(
    userId: string,
    pageOptions: PageOptionsDTO,
  ): Promise<PageDTO<TaskModel>> {
    const queryBuilder = this.taskRepository.createQueryBuilder('task');

    queryBuilder
      .select([
        'task.id',
        'task.title',
        'task.description',
        'task.status',
        'task.createdAt',
      ])
      .leftJoin('task.user', 'user')
      .where('user.id = :userId', { userId })
      .orderBy('task.createdAt', pageOptions.order)
      .skip(pageOptions.skip)
      .take(pageOptions.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDTO({
      itemCount,
      pageOptionsDto: pageOptions,
    });

    return new PageDTO(entities, pageMetaDto);
  }

  public async findById(taskId: string): Promise<TaskModel> {
    return await this.taskRepository.findOne({
      where: { id: taskId },
    });
  }

  public async create(
    userId: string,
    taskData: CreateTaskDTO,
    file: Express.Multer.File,
  ): Promise<TaskModel> {
    const data = await this.taskRepository.save({ ...taskData, user: userId });

    const dataHistory: History = {
      user: userId,
      task: data.id,
      action: TaskActionEnum.CREATE,
    };
    await this.historyRepository.save(dataHistory);

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) throw new BadRequestException(TaskResponse.SIZE_FILE);

      const allowExt = ['pdf', 'png', 'jpg'];
      const ext = file.originalname.split('.').pop();
      if (!allowExt.includes(ext))
        throw new BadRequestException(TaskResponse.WRONG_EXT);

      const fileUrl = await this.s3Service.uploadFile(file, {
        ...data,
        user: userId,
      });

      if (!fileUrl)
        throw new InternalServerErrorException(TaskResponse.UPLOAD_ERROR);

      await this.taskRepository.update(data.id, { file: fileUrl });

      return { ...data, file: fileUrl };
    }

    return data;
  }

  public async edit(
    taskId: string,
    taskData: EditTaskDTO,
    file?: Express.Multer.File,
  ): Promise<TaskModel> {
    const data = await this.taskRepository.save({ id: taskId, ...taskData });

    const dataHistory: History = {
      user: data.user,
      task: taskId,
      action: TaskActionEnum.EDIT,
    };
    await this.historyRepository.save(dataHistory);

    if (file) {
      const fileSize = file.size / (1024 * 1024);
      if (fileSize > 5) throw new BadRequestException(TaskResponse.SIZE_FILE);

      const allowExt = ['pdf', 'png', 'jpg'];
      const ext = file.originalname.split('.').pop();
      if (!allowExt.includes(ext))
        throw new BadRequestException(TaskResponse.WRONG_EXT);

      const fullTaskData = await this.taskRepository
        .createQueryBuilder('task')
        .innerJoinAndSelect('task.user', 'user')
        .where('task.id = :taskId', { taskId })
        .getOne();

      const userId = (fullTaskData.user as unknown as UserModel).id;

      const fileUrl = await this.s3Service.uploadFile(file, {
        ...fullTaskData,
        user: userId,
      });

      if (!fileUrl)
        throw new InternalServerErrorException(TaskResponse.UPLOAD_ERROR);

      await this.taskRepository.update(data.id, { file: fileUrl });

      return { ...data, file: fileUrl };
    }

    return data;
  }

  public async delete(taskId: string): Promise<DeleteResult> {
    const historyData = await this.historyRepository
      .createQueryBuilder('history_user_task')
      .leftJoinAndSelect('history_user_task.task', 'task')
      .where('task.id = :taskId', { taskId })
      .getMany();
    await this.historyRepository.remove(historyData);

    const taskData = await this.taskRepository.findOne({
      where: { id: taskId },
    });

    if (taskData.file) await this.s3Service.removeFile(taskData);

    return await this.taskRepository.delete(taskId);
  }
}
