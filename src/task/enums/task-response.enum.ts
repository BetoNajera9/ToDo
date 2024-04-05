export enum TaskResponse {
  SEARCH = 'The task has been found successfully.',
  CREATE = 'The task was saved correctly.',
  UPDATE = 'The task has been updated correctly.',
  REMOVE = 'The task was successfully removed.',

  NOT_FOUND = "The task hasn't been found successfully.",
  SIZE_FILE = 'File size is greater than 5MB.',
  WRONG_EXT = 'The file extension is not supported.',
  UPLOAD_ERROR = 'There was a problem uploading the file.',
}
