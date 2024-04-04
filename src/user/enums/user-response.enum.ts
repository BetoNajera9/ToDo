export enum UserResponse {
  SEARCH = 'The user has been found successfully.',
  CREATE = 'The user was saved correctly.',
  UPDATE = 'The user has been updated correctly.',
  REMOVE = 'The user was successfully removed.',

  NOT_FOUND = "The user hasn't been found successfully.",
  NAME_EXISTS = 'The email already exists.',
}
