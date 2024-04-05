import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

import { UserModel } from '@common/models';

import { CreateUserDTO, UserDTO } from './dto';
import { config } from './user.config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserModel)
    private readonly userRepository: Repository<UserModel>,
    @Inject(config.KEY)
    private readonly configUserService: ConfigType<typeof config>,
  ) {}

  public async findAll(): Promise<UserModel[]> {
    return await this.userRepository.find();
  }

  public async find(data: UserDTO): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: data,
    });
  }

  public async findById(id: string): Promise<UserModel> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  public async create(userData: CreateUserDTO): Promise<UserModel> {
    userData.password = await bcrypt.hash(
      userData.password,
      this.configUserService.saltRounds,
    );

    return await this.userRepository.save(userData);
  }

  public async edit(id: string, userData: UserDTO): Promise<UpdateResult> {
    return await this.userRepository.update(id, userData);
  }

  public async delete(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
