import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { API_URL } from "astro:env/server";

export const apolloClient = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
});
