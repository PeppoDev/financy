import { Field, Float, InputType } from "type-graphql";

import type { TransactionType } from "../../generated/prisma/enums.js";

@InputType()
export class UpsertTransaction {
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
  categoryId!: string;
}
