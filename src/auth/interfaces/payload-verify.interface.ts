import { PayloadToken } from './payload-token.interface';

export interface PayloadVerify extends PayloadToken {
  /**
   * Verify if the token is expired
   * @example true
   */
  isExpired: boolean;
}
