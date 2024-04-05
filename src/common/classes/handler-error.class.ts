import { HttpException, HttpStatus } from '@nestjs/common';
import { PostgresError } from 'pg-error-enum';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';
import {
  UnauthorizedException,
  ExceptionFilter,
  ArgumentsHost,
  Catch,
} from '@nestjs/common';

import { ServiceResponse } from '@common/interfaces';
/**
 * Function to get status code from exception
 * @param  {unknown} exception
 * @returns number
 */
export const getStatusCode = (exception: unknown): number => {
  return exception instanceof HttpException
    ? exception.getStatus()
    : HttpStatus.INTERNAL_SERVER_ERROR;
};
/**
 * Function to get error message
 * @param  {unknown} exception
 * @returns string
 */
export const getErrorMessage = (exception: unknown): string => {
  return String(exception);
};

@Catch()
export class HandlerError implements ExceptionFilter {
  /**
   * This catch get the exceptions and then classify errors and return a customized response
   * @param  {any} exception
   * @param  {ArgumentsHost} host
   * @return HTTP Response
   */
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = getErrorMessage(exception);
    let code = getStatusCode(exception);

    const resData: ServiceResponse = {
      success: false,
      statusCode: `${code}`,
      message,
    };

    switch (exception.constructor) {
      case QueryFailedError:
        const codeError = (exception as any).code;
        const detailError = (exception as any).detail;

        if (codeError === PostgresError.UNIQUE_VIOLATION) {
          code = HttpStatus.BAD_REQUEST;

          resData.statusCode = codeError;
          resData.message = detailError;
        }

        break;

      case UnauthorizedException:
        code = HttpStatus.UNAUTHORIZED;

        resData.message = (exception as any).response.message;
        resData.statusCode = (exception as any).response.error;
        break;
    }

    response.status(code).json(resData);
  }
}
