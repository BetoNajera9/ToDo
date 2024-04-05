export enum AuthResponse {
  SUCCESS = 'The user is logged in correctly',
  ERROR_CREDENTIAL = 'The email and/or password are incorrect',
  INVALID_TOKEN = 'The token is invalid',
  EXPIRED_TOKEN = 'The token expired',
}
