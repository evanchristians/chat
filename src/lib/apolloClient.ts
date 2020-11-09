import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: "https://gql-sub.herokuapp.com/graphql",
  credentials: "include",
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: "ws://gql-sub.herokuapp.com/subscriptions",
      options: {
        reconnect: true,
      },
    })
  : null;

const link = wsLink
  ? split(
      ({ query }) => {
        const def = getMainDefinition(query);
        return (
          def.kind === "OperationDefinition" && def.operation === "subscription"
        );
      },
      wsLink,
      httpLink
    )
  : httpLink;

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default apolloClient;
