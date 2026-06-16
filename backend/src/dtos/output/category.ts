import { Field, ID, ObjectType } from "type-graphql";

import type { Nullable } from "../nullable.js";
import { User } from "./user.js";

@ObjectType()
export class Category {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  title!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String, { nullable: true })
  description?: Nullable<string>;

  @Field(() => String)
  authorId!: string;

  @Field(() => User, { nullable: true })
  author?: Nullable<User>;
}
