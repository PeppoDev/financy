import { type SignupFormValues } from "@/pages/signup/signup-form";

export type CreateUserMutationData = {
  createUser: {
    id: string;
    email: string;
    name: string;
  };
};

export type CreateUserMutationVariables = {
  data: {
    name: string;
    email: string;
    password: string;
  };
};

export type SignupOnSubmitParam = SignupFormValues;

export type SignupOnSubmitReturn = Promise<void>;

export type OnSubmitFunction = (
  data: SignupOnSubmitParam,
) => SignupOnSubmitReturn;

export type UpdateUserMutationData = {
  updateUser: {
    id: string;
    name: string;
    email: string;
  };
};

export type UpdateUserMutationVariables = {
  data: {
    name: string;
  };
};
