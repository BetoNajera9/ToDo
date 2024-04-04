export class ServiceResponse {
  /**
   * A boolean if the request succeeded
   * @example true
   */
  success: boolean;

  /**
   * The code of the petition's status
   * @example CREATE
   */
  statusCode: string;

  /**
   * The response message
   * @example The user was saved correctly.
   */
  message: string;

  /**
   * The response data
   * @example Object
   */
  data?: any;
}
