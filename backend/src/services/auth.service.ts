import { prisma } from "../../prisma/prisma.js";
import type { Login } from "../dtos/input/login.js";
import type { Auth } from "../dtos/output/auth.js";
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
      throw new Error("Usuário não cadastrado!");

    const compare = await CryptHelper.compare(
      data.password,
      existingUser.password,
    );

    // TODO: create custom exception
    if (!compare) throw new Error("Senha inválida!");
    const tokens = this.generateTokens(existingUser);

    return { ...tokens, user: existingUser };
  }

  // TODO: Change the value here
  generateTokens(user: User) {
    const token = JWTHelper.signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "15m",
    );

    const refreshToken = JWTHelper.signJwt(
      {
        id: user.id,
        email: user.email,
      },
      "1d",
    );

    return { token, refreshToken };
  }
}
