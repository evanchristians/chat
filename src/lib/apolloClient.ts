import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { HTTP_URI, WS_URI } from "../constants";

const httpLink = new HttpLink({
  uri: HTTP_URI,
});

const wsLink = process.browser
  ? new WebSocketLink({
      uri: WS_URI,
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
