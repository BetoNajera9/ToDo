import {
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  Entity,
  Column,
} from 'typeorm';

import { TaskStatusEnum } from '@common/enum';

import { HistoryModel } from './history.model';
import { UserModel } from './user.model';

@Entity({ name: 'task' })
export class TaskModel {
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
  @ManyToOne(() => UserModel, (user) => user.task)
  user: string;

  /**
   * The title of the task
   * @example Homework
   */
  @Column()
  title: string;

  /**
   * The description of the task
   * @example I have to do the nuance homework, which left me series 4 to solve.
   */
  @Column()
  description: string;

  /**
   * The status of the task
   * @example IN_PROGRES
   */
  @Column({ type: 'enum', enum: TaskStatusEnum })
  status: TaskStatusEnum;

  /**
   * The comment of the task
   * @example Get the series from the school's website
   */
  @Column({ nullable: true })
  comment: string;

  /**
   * A list of tags
   * @example ['Mathematics', 'algebra']
   */
  @Column('simple-array', { nullable: true })
  tags: string[];

  /**
   * Link where the file is located
   * @example https://play-lh.googleusercontent.com/1nfAdJs2Ep2q1skM7QwJ1uHooWSbpFkbIBHhAX6EmdzEKmtk42713TiTU28mWlkcFKPA=w240-h480-rw
   */
  @Column({ nullable: true })
  file: string;

  /**
   * Relationship to history where the file is located
   * @example HistoryModel[]
   */
  @OneToMany(() => HistoryModel, (historyModule) => historyModule.task)
  history: HistoryModel[];

  /**
   * This is the timestamp at which the task was created.
   * @example 2024-04-03 17:20:38.275074
   */
  @CreateDateColumn({
    type: 'timestamp',
    name: 'created_at',
  })
  createdAt: Date;

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
