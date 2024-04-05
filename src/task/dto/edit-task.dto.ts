import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsOptional,
  ValidateIf,
  IsString,
  IsArray,
  IsEnum,
} from 'class-validator';

import { TaskStatusEnum } from '@common/enum';

export class EditTaskDTO {
  /**
   * The title of the task
   * @example Math homework
   */
  @ValidateIf((dto) => typeof dto.description === 'undefined')
  @ApiProperty({ description: 'The title of the task' })
  @IsOptional()
  @IsString()
  title?: string;

  /**
   * The description of the task
   * @example Do algebra exercises from page 9
   */
  @ApiProperty({ description: 'The description of the task' })
  @ValidateIf((dto) => typeof dto.status === 'undefined')
  @IsOptional()
  @IsString()
  description?: string;

  /**
   * The status of the task
   * @example PENDING
   */
  @ValidateIf((dto) => typeof dto.comment === 'undefined')
  @ApiProperty({ description: 'The status of the task' })
  @IsEnum(TaskStatusEnum)
  @IsOptional()
  status?: TaskStatusEnum;

  /**
   * The comment of the task
   * @example Get the series from the school's website
   */
  @ApiProperty({ description: 'The comment of the task' })
  @ValidateIf((dto) => typeof dto.tags === 'undefined')
  @IsOptional()
  @IsString()
  comment?: string;

  /**
   * A list of tags
   * @example ['Mathematics', 'algebra']
   */
  @ApiProperty({ description: 'The comment of the task' })
  @ValidateIf((dto) => typeof dto.file === 'undefined')
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsOptional()
  @IsArray()
  tags?: string[];

  /**
   * Link where the file is located
   * @example https://play-lh.googleusercontent.com/1nfAdJs2Ep2q1skM7QwJ1uHooWSbpFkbIBHhAX6EmdzEKmtk42713TiTU28mWlkcFKPA=w240-h480-rw
   */
  @ApiProperty({ description: 'The comment of the task' })
  @IsOptional()
  @IsString()
  file?: string;
}
