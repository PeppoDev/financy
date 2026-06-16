import type { MiddlewareFn } from "type-graphql";

import { UnauthorizedException } from "../exceptions/graphql.exception.js";
import type { GraphqlContext } from "../graphql/context/index.js";

export const IsAuth: MiddlewareFn<GraphqlContext> = async (
  { context },
  next,
) => {
  if (!context.user) throw new UnauthorizedException("User not authenticated!");
  return next();
};
