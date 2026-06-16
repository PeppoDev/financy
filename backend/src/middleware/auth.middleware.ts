import type { MiddlewareFn } from "type-graphql";

import type { GraphqlContext } from "../graphql/context/index.js";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  console.log(context.user);
  if (!context.user) throw new Error("Usuário não autenticado!");
  return next();
};
