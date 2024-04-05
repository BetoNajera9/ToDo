export interface Payload {
  /**
   * The name of the user
   * @example Brad
   */
  name: string;

  /**
   * The last name of the user
   * @example Torp
   */
  lastName: string;

  /**
   * Id is the userModel identifier
   * @example 9517caf3-dcda-481a-b019-fcbb49b7efe4
   */
  sub: string;
}
