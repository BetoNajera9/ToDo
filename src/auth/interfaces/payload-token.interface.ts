import { Payload } from './payload.interface';

export interface PayloadToken extends Payload {
  /**
   * Date and time of token creation
   * @example 1712287169
   */
  iat: number;

  /**
   * Date and time of token expiration
   * @example 1712290769
   */
  exp: number;
}
