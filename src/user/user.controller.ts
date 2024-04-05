import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from '@common/interfaces';
import { ResponseService } from '@common/classes';
import {
  Controller,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { CreateUserDTO, UserDTO } from './dto';
import { UserService } from './user.service';
import { UserResponse } from './enums';

@ApiTags('Users')
@Controller('user')
export class UserController {
  private responseService: ResponseService;

  constructor(private readonly usersService: UserService) {
    this.responseService = new ResponseService(UserResponse);
  }

  @Get()
  @ApiOperation({
    description: 'This endpoint obtains all registered users in database.',
    summary: 'Get all the users',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async findAllUser(): Promise<ServiceResponse> {
    const responseData = await this.usersService.findAll();

    if (!responseData.length)
      return this.responseService.handlerResponse(
        false,
        UserResponse.NOT_FOUND,
      );

    return this.responseService.handlerResponse(
      true,
      UserResponse.SEARCH,
      responseData,
    );
  }

  @Get(':id')
  @ApiOperation({
    description:
      'This endpoint obtains the user with id from the identifier of the parameter.',
    summary: 'Get a user by id',
  })
  @ApiParam({ name: 'id', description: 'The user identifier of type UUID' })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async findUser(
    @Param() { id: userId }: { id: string },
  ): Promise<ServiceResponse> {
    const responseData = await this.usersService.findById(userId);

    if (!responseData)
      return this.responseService.handlerResponse(
        false,
        UserResponse.NOT_FOUND,
      );

    return this.responseService.handlerResponse(
      true,
      UserResponse.SEARCH,
      responseData,
    );
  }

  @Post('register')
  @ApiOperation({
    description: 'This endpoint creates the registration of a new user.',
    summary: 'Register user',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 201,
  })
  public async registerUser(
    @Body() body: CreateUserDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.usersService.create(body);

    return this.responseService.handlerResponse(
      true,
      UserResponse.CREATE,
      responseData,
    );
  }

  @Patch(':id')
  @ApiOperation({
    description:
      'This endpoint updates user data, which can be first name, last name and/or email address.',
    summary: 'Update user',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async updateUser(
    @Param() userId: string,
    @Body() body: UserDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.usersService.edit(userId, body);

    return this.responseService.handlerResponse(
      true,
      UserResponse.UPDATE,
      responseData,
    );
  }

  @Delete(':id')
  @ApiOperation({
    description:
      'This endpoint removes the user with the identifier of the parameter.',
    summary: 'Delete user',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async deleteUser(@Param() userId: string): Promise<ServiceResponse> {
    const responseData = await this.usersService.delete(userId);

    return this.responseService.handlerResponse(
      true,
      UserResponse.REMOVE,
      responseData,
    );
  }
}
