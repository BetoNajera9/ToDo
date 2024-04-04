import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable } from 'rxjs';

import { LoggerServer } from '../classes';

/** Class to create a interceptor for printing the input data */
@Injectable()
export class InputInterceptor implements NestInterceptor {
  /** LoggerServer instance to print the input data */
  private logService = new LoggerServer();

  /**
   * Function to catch the input data
   * @param {ExecutionContext} context An object of type ExecutionContext
   * @param {CallHandler<any>} next an object of type CallHandler<any>
   * @returns An object of type Observable<any>
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const request = context.getArgByIndex(1).req;

    const data = request?.body;

    this.logService.input(data);

    return next.handle();
  }
}
