import "reflect-metadata";
import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";

import { buildContext } from "./graphql/context/index.js";
import { AuthResolver } from "./resolvers/auth.resolver.js";
import { CategoryResolver } from "./resolvers/category.resolver.js";
import { TransactionResolver } from "./resolvers/transaction.resolver.js";
import { UserResolver } from "./resolvers/user.resolver.js";

async function bootstrap() {
  const server = express();
  server.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    }),
  );

  const schema = await buildSchema({
    resolvers: [
      UserResolver,
      AuthResolver,
      CategoryResolver,
      TransactionResolver,
    ],
    validate: false,
    emitSchemaFile: "./schema.graphql",
  });

  const apolloServer = new ApolloServer({
    schema,
  });
  await apolloServer.start();

  server.use(
    "/graphql",
    express.json(),
    expressMiddleware(apolloServer, {
      context: buildContext,
    }),
  );

  server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}

bootstrap();
