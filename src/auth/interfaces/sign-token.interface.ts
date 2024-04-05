import * as jwt from 'jsonwebtoken';

export interface SignToken {
  /**
   * Data to be coded
   * @example {name: 'Tom'}
   */
  payload: jwt.JwtPayload;

  /**
   * The secret string which is the basis for encrypting the payload
   * @example this is my secret
   */
  secret: string;

  /**
   * The time at which the token is exiprated
   * @example 1h
   */
  expires: number | string;
}
