import { Observable, map } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { LoggerServer } from '../classes';

/** Class to create a interceptor for printing the response data */
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  /** LoggerServer instance to print the response data */
  private logService = new LoggerServer();

  /**
   * Function to catch the response data
   * @param {ExecutionContext} context An object of type ExecutionContext
   * @param {CallHandler<any>} next an object of type CallHandler<any>
   * @returns An object of type Observable<any>
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        this.logService.response(data);

        return data;
      }),
    );
  }
}
