import { Observable, catchError } from 'rxjs';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { LoggerServer } from '../classes';

/** Class to create a interceptor for printing the error data */
@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  /** LoggerServer instance to print the errors */
  private logService = new LoggerServer();

  /**
   * Function to catch the error data
   * @param {ExecutionContext} context An object of type ExecutionContext
   * @param {CallHandler<any>} next an object of type CallHandler<any>
   * @returns An object of type Observable<any>
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        this.logService.error(error);

        throw error;
      }),
    );
  }
}
