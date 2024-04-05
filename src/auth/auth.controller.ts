import { UnauthorizedException, Controller, Body, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ServiceResponse } from '@common/interfaces';
import { ResponseService } from '@common/classes';

import { AuthService } from './auth.service';
import { AuthResponse } from './enums';
import { LoginDTO } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private responseService: ResponseService;

  constructor(private readonly authService: AuthService) {
    this.responseService = new ResponseService(AuthResponse);
  }

  @Post('login')
  @ApiOperation({
    description: 'This endpoint the user log in and obtains an access token.',
    summary: 'The user log in',
  })
  @ApiResponse({
    description: 'Success response',
    type: ServiceResponse,
    status: 200,
  })
  async login(@Body() { email, password }: LoginDTO): Promise<ServiceResponse> {
    const userValidate = await this.authService.validateUser(email, password);

    if (!userValidate) {
      throw new UnauthorizedException(AuthResponse.ERROR_CREDENTIAL);
    }

    const jwtData = await this.authService.generateToken(userValidate);

    return this.responseService.handlerResponse(
      true,
      AuthResponse.SUCCESS,
      jwtData,
    );
  }
}
