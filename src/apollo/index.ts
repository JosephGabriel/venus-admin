import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const authHeader = localStorage.getItem("token") || "";

export const client = new ApolloClient({
  link: createUploadLink({
    headers: {
      authorization: `Bearer ${authHeader}`,
    },
    uri: "http://localhost:4000/graphql",
  }),
  connectToDevTools: true,
  cache: new InMemoryCache(),
});
