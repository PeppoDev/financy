import { useAuthStore } from "@/stores/auth";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";

const graphqlApiUrl = import.meta.env.VITE_BACKEND_URL;

if (!graphqlApiUrl) {
  throw new Error("Missing VITE_BACKEND_URL environment variable");
}

const httpLink = new HttpLink({
  uri: graphqlApiUrl,
  credentials: "include",
});

const authLink = new SetContextLink((prevContext) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...prevContext.headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
});
