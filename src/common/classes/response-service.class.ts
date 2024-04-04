export class ResponseService {
  private serviceResponse: Record<string, any>;

  constructor(responses?: Record<string, any>) {
    this.serviceResponse = responses || {};
  }

  /**
   * Function to generate and return a response
   * @param {boolean}success A boolean representing the status of response
   * @param {string}messageResponse A string representing the response text
   * @param {any}data All the data to return
   * @returns An object of type StatusResponse
   */
  handlerResponse(success: boolean, messageResponse: string, data?: any) {
    const index = Object.values(this.serviceResponse).indexOf(messageResponse);
    const code = Object.keys(this.serviceResponse)[index];

    return !code
      ? {
          success,
          code: 'UNDEFINED_RESPONSE',
          message: messageResponse,
          data,
        }
      : {
          success,
          code,
          message: messageResponse,
          data,
        };
  }
}