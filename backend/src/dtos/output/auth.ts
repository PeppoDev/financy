import { Field, ObjectType } from "type-graphql";
import { User } from "./user.js";

@ObjectType()
export class Auth {
  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;

  @Field(() => User)
  user!: User;
}
