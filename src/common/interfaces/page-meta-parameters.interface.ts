import { PageOptionsDTO } from '@common/dto';

export interface PageMetaParameters {
  /**
   * Page options
   * @example PageOptionsDTO
   */
  pageOptionsDto: PageOptionsDTO;

  /**
   * ItemCount
   * @example 10
   */
  itemCount: number;
}
