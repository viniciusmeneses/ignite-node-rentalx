declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  export interface Request {
    user: import("../../modules/accounts/entities/User").User;
  }
}
