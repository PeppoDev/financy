import { prisma } from "../../prisma/prisma.js";
import type { Login } from "../dtos/input/login.js";
import type { Auth } from "../dtos/output/auth.js";
import {
  NotFoundException,
  UnauthorizedException,
} from "../exceptions/graphql.exception.js";
import type { User } from "../generated/prisma/client.js";
import { CryptHelper } from "../helper/crypt.helper.js";
import { JWTHelper } from "../helper/jwt.helper.js";

export class AuthService {
  async login(data: Login): Promise<Auth> {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!existingUser || !existingUser.password)
      throw new NotFoundException("User not found!");

    const compare = await CryptHelper.compare(
      data.password,
      existingUser.password,
    );

    if (!compare) throw new UnauthorizedException("Invalid password!");
    const tokens = this.generateTokens(existingUser);

    return { ...tokens, user: existingUser };
  }

  generateTokens(user: User) {
    const minutes15 = 15 * 60;
    const day = 24 * 60 * 60;

    const token = JWTHelper.signJwt(
      {
        id: user.id,
        email: user.email,
      },
      minutes15,
    );

    const refreshToken = JWTHelper.signJwt(
      {
        id: user.id,
        email: user.email,
      },
      day,
    );

    return { token, refreshToken };
  }
}
