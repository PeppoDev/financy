import type { Secret } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export type JwtPayload = {
  id: string;
  email: string;
};

export class JWTHelper {
  static verifyJwt(token: string) {
    const secret: Secret = process.env.JWT_SECRET as unknown as Secret;
    return jwt.verify(token, secret) as JwtPayload;
  }

  static signJwt(payload: object, expiresIn: string) {
    const secret = process.env.JWT_SECRET as unknown as Secret;
    console.log(secret);
    let options: jwt.SignOptions = {};

    const expiration = expiresIn;

    if (expiration) {
      options = {
        expiresIn: expiration as unknown as NonNullable<
          jwt.SignOptions["expiresIn"]
        >,
      };
    }
    return jwt.sign(payload, secret, options);
  }
}
