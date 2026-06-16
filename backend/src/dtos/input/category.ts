import { Field, InputType } from "type-graphql";

import type { Nullable } from "../nullable.js";

@InputType()
export class UpsertCategory {
  @Field(() => String)
  title!: string;

  @Field(() => String)
  color!: string;

  @Field(() => String)
  icon!: string;

  @Field(() => String, { nullable: true })
  description?: Nullable<string>;
}
