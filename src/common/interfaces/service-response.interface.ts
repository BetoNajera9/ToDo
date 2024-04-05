import { ApiProperty } from '@nestjs/swagger';

export class ServiceResponse {
  /**
   * A boolean if the request succeeded
   * @example true
   */
  @ApiProperty({ description: 'A boolean if the request succeeded' })
  success: boolean;

  /**
   * The code of the petition's status
   * @example CREATE
   */
  @ApiProperty({ description: "The code of the petition's status" })
  statusCode: string;

  /**
   * The response message
   * @example The user was saved correctly.
   */
  @ApiProperty({ description: 'The response message' })
  message: string;

  /**
   * The response data
   * @example Object
   */
  @ApiProperty({ description: 'The response data' })
  data?: any;
}
