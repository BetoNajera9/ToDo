import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  Column,
  Entity,
} from 'typeorm';

import { HistoryModel } from './history.model';
import { TaskModel } from './task.model';

@Entity({ name: 'user' })
export class UserModel {
  /**
   * Id is the model identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The name of the user
   * @example Brad
   */
  @Column()
  name: string;

  /**
   * The last name of the user
   * @example Torp
   */
  @Column()
  lastName: string;

  /**
   * The email of the user
   * @example 1q2w3e4r
   */
  @Column({ unique: true })
  email: string;

  /**
   * The password of the user
   * @example 1q2w3e4r
   */
  @Column()
  password: string;

  /**
   * This is the timestamp at which the task was created.
   * @example 2024-04-03 17:20:38.275074
   */
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: string;

  /**
   * Relationship to history where the file is located
   * @example taskMododel[]
   */
  @OneToMany(() => TaskModel, (taskModule) => taskModule.user)
  task: TaskModel[];

  /**
   * Relationship to history where the file is located
   * @example HistoryModel[]
   */
  @OneToMany(() => HistoryModel, (historyModule) => historyModule.user)
  history: HistoryModel[];
}
