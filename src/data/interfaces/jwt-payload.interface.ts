// jwt-payload.interface
export interface JwtPayload {
  _id: string;
  sub: string;
  username: string;
  iat: number;
  exp: number;
}
