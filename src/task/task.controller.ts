import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  UseInterceptors,
  UploadedFile,
  Controller,
  UseGuards,
  Delete,
  Param,
  Body,
  Post,
  Get,
  Put,
  Query,
} from '@nestjs/common';

import { PageOptionsDTO, ParamsDTO } from '@common/dto';
import { ServiceResponse } from '@common/interfaces';
import { ResponseService } from '@common/classes';
import { AuthGuard } from '@auth/guards';

import { CreateTaskDTO, EditTaskDTO, ParamsIdDTO } from './dto';
import { TaskService } from './task.service';
import { TaskResponse } from './enums';

@ApiTags('Task')
@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  private responseService: ResponseService;

  constructor(private readonly taskService: TaskService) {
    this.responseService = new ResponseService(TaskResponse);
  }

  @Get()
  @ApiOperation({
    description: 'This endpoint obtains all registered tasks in database.',
    summary: 'Get all the tasks',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async findAllTask(@Query() pageOptions: PageOptionsDTO): Promise<any> {
    const { data, meta } = await this.taskService.findAll(pageOptions);

    if (!data.length)
      return this.responseService.handlerResponse(
        false,
        TaskResponse.NOT_FOUND,
      );

    return this.responseService.handlerResponse(
      true,
      TaskResponse.SEARCH,
      data,
      meta,
    );
  }

  @Get('my')
  @ApiOperation({
    description: 'This endpoint obtains my registered tasks in database.',
    summary: 'Get all my tasks',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async findMyTask(
    @Query() pageOptions: PageOptionsDTO,
    @Param() { userId }: ParamsDTO,
  ): Promise<ServiceResponse> {
    const { data, meta } = await this.taskService.findMyTask(
      userId,
      pageOptions,
    );

    if (!data.length)
      return this.responseService.handlerResponse(
        false,
        TaskResponse.NOT_FOUND,
      );

    return this.responseService.handlerResponse(
      true,
      TaskResponse.SEARCH,
      data,
      meta,
    );
  }

  @Get(':id')
  @ApiOperation({
    description:
      'This endpoint obtains the task with id from the identifier of the parameter.',
    summary: 'Get a task by id',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async findById(
    @Param() { id: taskId }: ParamsIdDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.taskService.findById(taskId);

    if (!responseData)
      return this.responseService.handlerResponse(
        false,
        TaskResponse.NOT_FOUND,
      );

    return this.responseService.handlerResponse(
      true,
      TaskResponse.SEARCH,
      responseData,
    );
  }

  @Post('create')
  @ApiOperation({
    description: 'This endpoint creates the registration of a new task.',
    summary: 'Create task',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 201,
  })
  @UseInterceptors(FileInterceptor('file'))
  public async createTask(
    @Body() body: CreateTaskDTO,
    @Param() { userId }: ParamsDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ServiceResponse> {
    const responseData = await this.taskService.create(userId, body);

    return this.responseService.handlerResponse(
      true,
      TaskResponse.CREATE,
      responseData,
    );
  }

  @Put(':id')
  @ApiOperation({
    description: 'This endpoint updates task data',
    summary: 'Update task',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async updateUser(
    @Param() { id: taskId }: ParamsIdDTO,
    @Body() body: EditTaskDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.taskService.edit(taskId, body);

    return this.responseService.handlerResponse(
      true,
      TaskResponse.UPDATE,
      responseData,
    );
  }

  @Delete(':id')
  @ApiOperation({
    description:
      'This endpoint removes the task with the identifier of the parameter.',
    summary: 'Delete task',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async deleteUser(
    @Param() { id: taskId }: ParamsIdDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.taskService.delete(taskId);

    return this.responseService.handlerResponse(
      true,
      TaskResponse.REMOVE,
      responseData,
    );
  }
}
