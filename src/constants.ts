export const IS_PROD = process.env.ENV === "production";
export const WS_URI = IS_PROD
  ? "wss://gql-sub.herokuapp.com/subscriptions"
  : "ws://localhost:5000/graphql/subscriptions";

export const HTTP_URI = IS_PROD
  ? "https://gql-sub.herokuapp.com/graphql"
  : "http://localhost:3000";
