import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

import { PageMetaDTO } from './page-meta.dto';

export class PageDTO<T> {
  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }

  /**
   * PageMetaDTO
   * @example {}
   */
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[];

  /**
   * Meta data
   * @example PageMetaDTO
   */
  @ApiProperty({ type: () => PageMetaDTO })
  readonly meta: PageMetaDTO;
}
