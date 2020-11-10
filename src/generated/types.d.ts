import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  ISODateTime: any;
};

export type Query = {
  __typename?: 'Query';
  messages: Array<Message>;
  getUsers: Array<User>;
  me?: Maybe<UserResponse>;
  getUser: User;
};


export type QueryGetUserArgs = {
  id: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  id: Scalars['ID'];
  text: Scalars['String'];
  sender: Scalars['String'];
  createdAt: Scalars['ISODateTime'];
  updatedAt: Scalars['ISODateTime'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  password: Scalars['String'];
  active: Scalars['Boolean'];
  count: Scalars['Float'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  user?: Maybe<User>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  removeMessages: Scalars['Boolean'];
  sendMessage: Message;
  removeUsers: Scalars['Boolean'];
  register: UserResponse;
  updateUser: User;
  login: UserResponse;
  invalidateTokens: Scalars['Boolean'];
  logout: Scalars['Boolean'];
};


export type MutationSendMessageArgs = {
  data: SendMessageInput;
};


export type MutationRegisterArgs = {
  data: RegisterInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String'];
};


export type MutationLoginArgs = {
  data: LoginInput;
};

export type SendMessageInput = {
  sender: Scalars['String'];
  text: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type UpdateUserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: Message;
};

export type SendMessageMutationVariables = Exact<{
  text: Scalars['String'];
  sender: Scalars['String'];
}>;


export type SendMessageMutation = (
  { __typename?: 'Mutation' }
  & { sendMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'text' | 'sender'>
  ) }
);

export type RemoveMessagesMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveMessagesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeMessages'>
);

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { messages: Array<(
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'sender' | 'createdAt'>
  )> }
);

export type NewMessageSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'Message' }
    & Pick<Message, 'id' | 'text' | 'sender' | 'createdAt'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type RemoveUsersMutationVariables = Exact<{ [key: string]: never; }>;


export type RemoveUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeUsers'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )> }
  )> }
);


export const SendMessageDocument = gql`
    mutation SendMessage($text: String!, $sender: String!) {
  sendMessage(data: {text: $text, sender: $sender}) {
    text
    sender
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      text: // value for 'text'
 *      sender: // value for 'sender'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, baseOptions);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const RemoveMessagesDocument = gql`
    mutation RemoveMessages {
  removeMessages
}
    `;
export type RemoveMessagesMutationFn = Apollo.MutationFunction<RemoveMessagesMutation, RemoveMessagesMutationVariables>;

/**
 * __useRemoveMessagesMutation__
 *
 * To run a mutation, you first call `useRemoveMessagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveMessagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeMessagesMutation, { data, loading, error }] = useRemoveMessagesMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveMessagesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveMessagesMutation, RemoveMessagesMutationVariables>) {
        return Apollo.useMutation<RemoveMessagesMutation, RemoveMessagesMutationVariables>(RemoveMessagesDocument, baseOptions);
      }
export type RemoveMessagesMutationHookResult = ReturnType<typeof useRemoveMessagesMutation>;
export type RemoveMessagesMutationResult = Apollo.MutationResult<RemoveMessagesMutation>;
export type RemoveMessagesMutationOptions = Apollo.BaseMutationOptions<RemoveMessagesMutation, RemoveMessagesMutationVariables>;
export const MessagesDocument = gql`
    query Messages {
  messages {
    id
    text
    sender
    createdAt
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, baseOptions);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const NewMessageDocument = gql`
    subscription NewMessage {
  newMessage {
    id
    text
    sender
    createdAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
  register(data: {username: $username, password: $password}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
  login(data: {username: $username, password: $password}) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RemoveUsersDocument = gql`
    mutation RemoveUsers {
  removeUsers
}
    `;
export type RemoveUsersMutationFn = Apollo.MutationFunction<RemoveUsersMutation, RemoveUsersMutationVariables>;

/**
 * __useRemoveUsersMutation__
 *
 * To run a mutation, you first call `useRemoveUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeUsersMutation, { data, loading, error }] = useRemoveUsersMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemoveUsersMutation(baseOptions?: Apollo.MutationHookOptions<RemoveUsersMutation, RemoveUsersMutationVariables>) {
        return Apollo.useMutation<RemoveUsersMutation, RemoveUsersMutationVariables>(RemoveUsersDocument, baseOptions);
      }
export type RemoveUsersMutationHookResult = ReturnType<typeof useRemoveUsersMutation>;
export type RemoveUsersMutationResult = Apollo.MutationResult<RemoveUsersMutation>;
export type RemoveUsersMutationOptions = Apollo.BaseMutationOptions<RemoveUsersMutation, RemoveUsersMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    user {
      id
      username
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;