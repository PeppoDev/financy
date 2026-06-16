import { Field, InputType } from "type-graphql";

@InputType()
export class Login {
  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}
