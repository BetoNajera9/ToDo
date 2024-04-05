import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

import { TaskActionEnum } from '@task/enums';

import { TaskModel } from './task.model';
import { UserModel } from './user.model';

@Entity({ name: 'history_user_task' })
export class HistoryModel {
  /**
   * Id is the model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * user_id is the user model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  @ManyToOne(() => UserModel, (user) => user.history)
  user: string;

  /**
   * task_id is the task model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  @ManyToOne(() => TaskModel, (task) => task.history)
  task: string;

  /**
   * Action is the movement in which the rate changes and will be saved in the history.
   * @example CREATE
   */
  @Column({ type: 'enum', enum: TaskActionEnum })
  action: TaskActionEnum;

  /**
   * This is the timestamp at which the task was updated.
   * @example 2024-04-03 17:20:38.275074
   */
  @UpdateDateColumn({
    type: 'timestamp',
    name: 'updated_at',
  })
  updatedAt: Date;
}
