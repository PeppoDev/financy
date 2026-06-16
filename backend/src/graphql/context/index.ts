import type { ExpressContextFunctionArgument } from "@as-integrations/express5";

import { JWTHelper } from "../../helper/jwt.helper.js";

export type GraphqlContext = {
  user: string | undefined;
  token: string | undefined;
  req: ExpressContextFunctionArgument["req"];
  res: ExpressContextFunctionArgument["res"];
};

export const buildContext = async ({
  req,
  res,
}: ExpressContextFunctionArgument): Promise<GraphqlContext> => {
  const authHeader = req.headers.authorization;
  let user: string | undefined;
  let token: string | undefined;

  if (authHeader?.startsWith("Bearer ")) {
    token = authHeader.substring("Bearer ".length);
    console.log("token: ", token);
    try {
      const payload = JWTHelper.verifyJwt(token);
      console.log("payload: ", payload);
      user = payload.id;
    } catch (error) {
      console.log(error);
    }
  }
  return { user, token, req, res };
};
