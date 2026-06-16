import { createParameterDecorator, type ResolverData } from "type-graphql";

import { prisma } from "../../../prisma/prisma.js";
import { NotFoundException } from "../../exceptions/graphql.exception.js";
import type { User } from "../../generated/prisma/client.js";
import type { GraphqlContext } from "../context/index.js";

export const GqlUser = () => {
  return createParameterDecorator(
    async ({ context }: ResolverData<GraphqlContext>): Promise<User | null> => {
      if (!context || !context.user) return null;

      try {
        const user = await prisma.user.findUnique({
          where: {
            id: context.user,
          },
        });
        if (!user) throw new NotFoundException("User not found");
        return user;
      } catch (error) {
        console.log("Error when instantiating gqluser");
        return null;
      }
    },
  );
};
