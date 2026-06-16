import { Field, Float, ID, ObjectType } from "type-graphql";

import type { TransactionType } from "../../generated/prisma/enums.js";
import type { Nullable } from "../nullable.js";
import { Category } from "./category.js";
import { User } from "./user.js";

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id!: string;

  // TODO: see how to do enum on graphql
  @Field(() => String)
  type!: TransactionType;

  @Field(() => String)
  description!: string;

  @Field(() => Date)
  date!: Date;

  @Field(() => Float)
  value!: number;

  @Field(() => String)
  authorId!: string;

  @Field(() => User, { nullable: true })
  author?: Nullable<User>;

  @Field(() => String)
  categoryId!: string;

  @Field(() => Category, { nullable: true })
  category?: Nullable<Category>;
}
