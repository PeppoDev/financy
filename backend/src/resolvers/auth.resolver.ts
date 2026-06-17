import { Arg, Mutation, Resolver } from "type-graphql";

import { Login } from "../dtos/input/login.js";
import { Auth } from "../dtos/output/auth.js";
import { AuthService } from "../services/auth.service.js";

@Resolver(Auth)
export class AuthResolver {
  constructor(private authService: AuthService) {
    this.authService = new AuthService();
  }

  @Mutation(() => Auth)
  async login(@Arg("data", () => Login) data: Login): Promise<Auth> {
    console.log(data);
    return this.authService.login(data);
  }
}
