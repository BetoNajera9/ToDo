import { TaskActionEnum } from '@common/enum';

export interface History {
  /**
   * The user model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  user: string;

  /**
   * The task model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  task: string;

  /**
   * Task action
   * @example CREATE
   */
  action: TaskActionEnum;
}
