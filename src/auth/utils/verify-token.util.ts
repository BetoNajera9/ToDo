import * as jwt from 'jsonwebtoken';

import { PayloadToken, PayloadVerify } from '@auth/interfaces';

/**
 * This function checks for expiration of the accessToken
 * @param  {string} token The token to verify
 * @returns Boolean
 */
export const verifyToken = (token: string): PayloadVerify => {
  const payload = jwt.decode(token) as PayloadToken;

  if (!payload) return null;

  const expiresDate = new Date(payload.exp);
  const currentDate = new Date();

  const payloadVerify: PayloadVerify = {
    ...payload,
    isExpired: +expiresDate <= +currentDate / 1000,
  };

  return payloadVerify;
};
