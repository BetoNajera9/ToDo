import { ApiProperty } from '@nestjs/swagger';

import { PageMetaParameters } from '@common/interfaces';

export class PageMetaDTO {
  constructor({ pageOptionsDto, itemCount }: PageMetaParameters) {
    this.page = pageOptionsDto.page;
    this.take = pageOptionsDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
  }

  /**
   * Get the page
   * @example 1
   */
  @ApiProperty()
  readonly page: number;

  /**
   * Get the take
   * @example 10
   */
  @ApiProperty()
  readonly take: number;

  /**
   * Get the item count
   * @example 1
   */
  @ApiProperty()
  readonly itemCount: number;

  /**
   * Get the page
   * @example 2
   */
  @ApiProperty()
  readonly pageCount: number;

  /**
   * Know if you have a previous page
   * @example false
   */
  @ApiProperty()
  readonly hasPreviousPage: boolean;

  /**
   * Know if you have a next page
   * @example true
   */
  @ApiProperty()
  readonly hasNextPage: boolean;
}
