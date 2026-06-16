import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUser {
  @Field(() => String)
  name!: string;

  @Field(() => String)
  email!: string;

  @Field(() => String)
  password!: string;
}

@InputType()
export class UpdateUser {
  @Field(() => String)
  name!: string;
}
