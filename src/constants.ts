export const IS_PROD = process.env.ENV === "production";
export const WS_URI = IS_PROD
  ? "wss://gql-sub-server.evanchristians.co.za/subscriptions"
  : "ws://localhost:5000/subscriptions";

export const HTTP_URI = IS_PROD
  ? "https://gql-sub-server.evanchristians.co.za/graphql"
  : "http://localhost:5000/graphql";
