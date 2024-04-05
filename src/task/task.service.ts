import { DeleteResult, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { PageDTO, PageMetaDTO, PageOptionsDTO } from '@common/dto';
import { HistoryModel, TaskModel } from '@common/models';
import { TaskActionEnum } from '@common/enum';

import { CreateTaskDTO, EditTaskDTO } from './dto';
import { History } from './interfaces';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskModel)
    private readonly taskRepository: Repository<TaskModel>,
    @InjectRepository(HistoryModel)
    private readonly historyRepository: Repository<HistoryModel>,
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
  ): Promise<TaskModel> {
    const data = await this.taskRepository.save({ ...taskData, user: userId });

    const dataHistory: History = {
      user: userId,
      task: data.id,
      action: TaskActionEnum.CREATE,
    };
    await this.historyRepository.save(dataHistory);

    return data;
  }

  public async edit(taskId: string, taskData: EditTaskDTO): Promise<TaskModel> {
    const data = await this.taskRepository.save({ id: taskId, ...taskData });

    const dataHistory: History = {
      user: data.user,
      task: taskId,
      action: TaskActionEnum.EDIT,
    };
    await this.historyRepository.save(dataHistory);

    return data;
  }

  public async delete(taskId: string): Promise<DeleteResult> {
    const historyData = await this.historyRepository
      .createQueryBuilder('history_user_task')
      .leftJoinAndSelect('history_user_task.task', 'task')
      .where('task.id = :taskId', { taskId })
      .getMany();
    await this.historyRepository.remove(historyData);

    return await this.taskRepository.delete(taskId);
  }
}
