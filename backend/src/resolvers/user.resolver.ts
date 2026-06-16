import { Arg, Mutation, Query, Resolver } from "type-graphql";

import { CreateUser } from "../dtos/input/user.js";
import { User } from "../dtos/output/user.js";
import { UserService } from "../services/user.service.js";

@Resolver(User)
export class UserResolver {
  constructor(private userService: UserService) {
    this.userService = new UserService();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("data", () => CreateUser) data: CreateUser,
  ): Promise<User> {
    return this.userService.create(data);
  }

  @Query(() => User)
  async findUserById(
    @Arg("userId", () => String) userId: string,
  ): Promise<User> {
    return this.userService.find(userId);
  }

  // @Mutation(() => User)
  // async update(@Arg("data", () => CreateUser) data: CreateUser): Promise<User> {
  //   return this.userService.update(data);
  // }
}
