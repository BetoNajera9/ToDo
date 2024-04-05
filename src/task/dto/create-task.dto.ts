import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';

import { TaskStatusEnum } from '@task/enums';

export class CreateTaskDTO {
  /**
   * The title of the task
   * @example Math homework
   */
  @ApiProperty({ description: 'The title of the task' })
  @IsNotEmpty()
  @IsString()
  title: string;

  /**
   * The description of the task
   * @example Do algebra exercises from page 9
   */
  @ApiProperty({ description: 'The description of the task' })
  @IsNotEmpty()
  @IsString()
  description: string;

  /**
   * The status of the task
   * @example PENDING
   */
  @ApiProperty({ description: 'The status of the task' })
  @IsEnum(TaskStatusEnum)
  @IsNotEmpty()
  status: TaskStatusEnum;

  /**
   * The comment of the task
   * @example Get the series from the school's website
   */
  @ApiProperty({ description: 'The comment of the task' })
  @IsOptional()
  @IsString()
  comment?: string;

  /**
   * A list of tags
   * @example ['Mathematics', 'algebra']
   */
  @ApiProperty({ description: 'The comment of the task' })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  @IsArray()
  tags?: string[];
}
