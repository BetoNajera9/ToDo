import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';

/** Class to print the data in consolen*/
@Injectable()
export class LoggerServer {
  /** The Logger instance to print the data */
  private logger: PinoLogger;

  /** Function to create a LoggerServer instance */
  constructor() {
    this.logger = new PinoLogger({});
  }

  /**
   * Function to print the input data in the console
   * @param data An any representing the data to print
   */
  input(data: any): void {
    this.logger.info({ input: data }, 'Input');
  }

  /**
   * Function to print the response data in the console
   * @param data An any representing the data to print
   */
  response(data: any): void {
    this.logger.info({ response: data }, 'Response');
  }

  /**
   * Function to print the error data in the console
   * @param data An any representing the data to print
   */
  error(data: any): void {
    this.logger.error(
      { error: { message: data.message, fullError: data } },
      `Error: ${data.name}`,
    );
  }
}
