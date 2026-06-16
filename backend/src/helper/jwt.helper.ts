import type { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

export class JWTHelper {
  static verifyJwt(token: string) {
    const secret: Secret = process.env.JWT_SECRET as string;
    return jwt.verify(token, secret) as JwtPayload;
  }

  static signJwt(payload: object, expiresIn: number) {
    const secret = process.env.JWT_SECRET as string;
    return jwt.sign(payload, secret, {
      expiresIn,
    });
  }
}
