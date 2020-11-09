export const IS_PROD = process.env.ENV === "production";
// export const IS_PROD = true;
export const WS_URI = IS_PROD
  ? "wss://gql-sub.herokuapp.com/subscriptions"
  : "ws://localhost:5000/subscriptions";

export const HTTP_URI = IS_PROD
  ? "https://gql-sub.herokuapp.com/graphql"
  : "http://localhost:5000/graphql";
