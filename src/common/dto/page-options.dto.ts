import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { PageOrder } from '@common/enum';

export class PageOptionsDTO {
  /**
   * The order of the data
   * @example ASC
   */
  @ApiPropertyOptional({ enum: PageOrder, default: PageOrder.ASC })
  @IsEnum(PageOrder)
  @IsOptional()
  readonly order?: PageOrder = PageOrder.ASC;

  /**
   * Get the page
   * @example 1
   */
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  /**
   * Get the take
   * @example 10
   */
  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  /**
   * A function that returns the skip
   * @returns number
   */
  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
