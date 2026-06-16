import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const graphqlApiUrl = import.meta.env.VITE_BACKEND_URL;

if (!graphqlApiUrl) {
  throw new Error("Missing VITE_BACKEND_URL environment variable");
}

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: graphqlApiUrl,
    credentials: "include",
  }),
});
