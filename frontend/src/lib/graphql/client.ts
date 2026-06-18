import { useAuthStore } from "@/stores/auth";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { onError } from "@apollo/client/link/error";

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

let isRedirectingToSignin = false;

const authErrorLink = onError(({ error }) => {
  const isUnauthenticatedError =
    CombinedGraphQLErrors.is(error) &&
    error.errors.some((graphqlError) => {
      return graphqlError.message === "User not authenticated!";
    });

  if (!isUnauthenticatedError || isRedirectingToSignin) {
    return;
  }

  isRedirectingToSignin = true;

  useAuthStore.getState().logout();

  if (typeof window !== "undefined" && window.location.pathname !== "/signin") {
    window.location.assign("/signin");
  }
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authErrorLink, authLink, httpLink]),
});
