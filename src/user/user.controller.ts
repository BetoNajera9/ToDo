import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceResponse } from '@common/interfaces';
import { ResponseService } from '@common/classes';
import {
  Controller,
  UseGuards,
  Delete,
  Param,
  Patch,
  Body,
  Post,
  Get,
} from '@nestjs/common';

import { PublicAccess } from '@auth/decorators';
import { AuthGuard } from '@auth/guards';
import { ParamsDTO } from '@common/dto';

import { CreateUserDTO, ParamsIdDTO, UserDTO } from './dto';
import { UserService } from './user.service';
import { UserResponse } from './enums';

@ApiTags('Users')
@Controller('user')
@UseGuards(AuthGuard)
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
  @PublicAccess()
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
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  @PublicAccess()
  public async findUser(
    @Param() { id: userId }: ParamsIdDTO,
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
  @PublicAccess()
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

  @Patch()
  @ApiOperation({
    description:
      'This endpoint updates my user data, which can be first name, last name and/or email address.',
    summary: 'Update user',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async updateMyUser(
    @Param() { userId }: ParamsDTO,
    @Body() body: UserDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.usersService.edit(userId, body);

    return this.responseService.handlerResponse(
      true,
      UserResponse.UPDATE,
      responseData,
    );
  }

  @Delete()
  @ApiOperation({
    description:
      'This endpoint removes the user with the payload identifier from the access token.',
    summary: 'Delete my user',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  public async deleteMyUser(
    @Param() { userId }: ParamsDTO,
  ): Promise<ServiceResponse> {
    const responseData = await this.usersService.delete(userId);

    return this.responseService.handlerResponse(
      true,
      UserResponse.REMOVE,
      responseData,
    );
  }
}
