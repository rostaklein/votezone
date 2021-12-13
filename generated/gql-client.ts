import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Chronicle = {
  __typename?: 'Chronicle';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortcut?: Maybe<Scalars['String']>;
};

export type CreateServerInput = {
  adena: Scalars['Int'];
  chronicle: Scalars['ID'];
  description: Scalars['String'];
  drop: Scalars['Int'];
  name: Scalars['String'];
  openingAt?: InputMaybe<Scalars['DateTime']>;
  sp: Scalars['Int'];
  spoil: Scalars['Int'];
  xp: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createServer?: Maybe<Server>;
  deleteServer?: Maybe<Server>;
  login?: Maybe<AuthPayload>;
  register?: Maybe<User>;
};


export type MutationCreateServerArgs = {
  input: CreateServerInput;
};


export type MutationDeleteServerArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  approvedServers?: Maybe<Array<Maybe<Server>>>;
  chronicles?: Maybe<Array<Maybe<Chronicle>>>;
  me?: Maybe<User>;
  server?: Maybe<Server>;
  unapprovedServers?: Maybe<Array<Maybe<Server>>>;
};


export type QueryServerArgs = {
  id: Scalars['ID'];
};

export type Server = {
  __typename?: 'Server';
  addedBy?: Maybe<User>;
  chronicle?: Maybe<Chronicle>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  openingAt?: Maybe<Scalars['DateTime']>;
  rates?: Maybe<ServerRates>;
};

export type ServerRates = {
  __typename?: 'ServerRates';
  adena?: Maybe<Scalars['Int']>;
  drop?: Maybe<Scalars['Int']>;
  sp?: Maybe<Scalars['Int']>;
  spoil?: Maybe<Scalars['Int']>;
  xp?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  addedServers?: Maybe<Array<Maybe<Server>>>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type LoginMutationVariables = Exact<{
  loginEmail: Scalars['String'];
  loginPassword: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'AuthPayload', token?: string | null | undefined, user?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined, addedServers?: Array<{ __typename?: 'Server', id?: string | null | undefined, name?: string | null | undefined, createdAt?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined, addedServers?: Array<{ __typename?: 'Server', id?: string | null | undefined, name?: string | null | undefined, createdAt?: any | null | undefined } | null | undefined> | null | undefined } | null | undefined };

export type ChroniclesQueryVariables = Exact<{ [key: string]: never; }>;


export type ChroniclesQuery = { __typename?: 'Query', chronicles?: Array<{ __typename?: 'Chronicle', id?: string | null | undefined, name?: string | null | undefined, shortcut?: string | null | undefined } | null | undefined> | null | undefined };

export type CreateServerMutationVariables = Exact<{
  input: CreateServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer?: { __typename?: 'Server', id?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, chronicle?: { __typename?: 'Chronicle', name?: string | null | undefined } | null | undefined } | null | undefined };

export type ServerQueryVariables = Exact<{
  serverId: Scalars['ID'];
}>;


export type ServerQuery = { __typename?: 'Query', server?: { __typename?: 'Server', id?: string | null | undefined, description?: string | null | undefined, createdAt?: any | null | undefined, name?: string | null | undefined, chronicle?: { __typename?: 'Chronicle', name?: string | null | undefined } | null | undefined, addedBy?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined } | null | undefined } | null | undefined };

export type DeleteServerMutationVariables = Exact<{
  serverId: Scalars['ID'];
}>;


export type DeleteServerMutation = { __typename?: 'Mutation', deleteServer?: { __typename?: 'Server', id?: string | null | undefined } | null | undefined };

export type ApprovedServersQueryVariables = Exact<{ [key: string]: never; }>;


export type ApprovedServersQuery = { __typename?: 'Query', approvedServers?: Array<{ __typename?: 'Server', id?: string | null | undefined, name?: string | null | undefined, description?: string | null | undefined, openingAt?: any | null | undefined, createdAt?: any | null | undefined, addedBy?: { __typename?: 'User', name?: string | null | undefined } | null | undefined, chronicle?: { __typename?: 'Chronicle', shortcut?: string | null | undefined, name?: string | null | undefined } | null | undefined, rates?: { __typename?: 'ServerRates', xp?: number | null | undefined, sp?: number | null | undefined, adena?: number | null | undefined, drop?: number | null | undefined, spoil?: number | null | undefined } | null | undefined } | null | undefined> | null | undefined };

export type SignUpMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignUpMutation = { __typename?: 'Mutation', register?: { __typename?: 'User', id?: string | null | undefined, name?: string | null | undefined, email?: string | null | undefined } | null | undefined };


export const LoginDocument = gql`
    mutation Login($loginEmail: String!, $loginPassword: String!) {
  login(email: $loginEmail, password: $loginPassword) {
    user {
      id
      name
      email
      addedServers {
        id
        name
        createdAt
      }
    }
    token
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
 *      loginEmail: // value for 'loginEmail'
 *      loginPassword: // value for 'loginPassword'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    email
    addedServers {
      id
      name
      createdAt
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
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ChroniclesDocument = gql`
    query Chronicles {
  chronicles {
    id
    name
    shortcut
  }
}
    `;

/**
 * __useChroniclesQuery__
 *
 * To run a query within a React component, call `useChroniclesQuery` and pass it any options that fit your needs.
 * When your component renders, `useChroniclesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChroniclesQuery({
 *   variables: {
 *   },
 * });
 */
export function useChroniclesQuery(baseOptions?: Apollo.QueryHookOptions<ChroniclesQuery, ChroniclesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChroniclesQuery, ChroniclesQueryVariables>(ChroniclesDocument, options);
      }
export function useChroniclesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChroniclesQuery, ChroniclesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChroniclesQuery, ChroniclesQueryVariables>(ChroniclesDocument, options);
        }
export type ChroniclesQueryHookResult = ReturnType<typeof useChroniclesQuery>;
export type ChroniclesLazyQueryHookResult = ReturnType<typeof useChroniclesLazyQuery>;
export type ChroniclesQueryResult = Apollo.QueryResult<ChroniclesQuery, ChroniclesQueryVariables>;
export const CreateServerDocument = gql`
    mutation CreateServer($input: CreateServerInput!) {
  createServer(input: $input) {
    id
    name
    description
    chronicle {
      name
    }
  }
}
    `;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const ServerDocument = gql`
    query Server($serverId: ID!) {
  server(id: $serverId) {
    id
    chronicle {
      name
    }
    addedBy {
      id
      name
    }
    description
    createdAt
    name
  }
}
    `;

/**
 * __useServerQuery__
 *
 * To run a query within a React component, call `useServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useServerQuery(baseOptions: Apollo.QueryHookOptions<ServerQuery, ServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
      }
export function useServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
export type ServerQueryHookResult = ReturnType<typeof useServerQuery>;
export type ServerLazyQueryHookResult = ReturnType<typeof useServerLazyQuery>;
export type ServerQueryResult = Apollo.QueryResult<ServerQuery, ServerQueryVariables>;
export const DeleteServerDocument = gql`
    mutation DeleteServer($serverId: ID!) {
  deleteServer(id: $serverId) {
    id
  }
}
    `;
export type DeleteServerMutationFn = Apollo.MutationFunction<DeleteServerMutation, DeleteServerMutationVariables>;

/**
 * __useDeleteServerMutation__
 *
 * To run a mutation, you first call `useDeleteServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerMutation, { data, loading, error }] = useDeleteServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteServerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServerMutation, DeleteServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument, options);
      }
export type DeleteServerMutationHookResult = ReturnType<typeof useDeleteServerMutation>;
export type DeleteServerMutationResult = Apollo.MutationResult<DeleteServerMutation>;
export type DeleteServerMutationOptions = Apollo.BaseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables>;
export const ApprovedServersDocument = gql`
    query ApprovedServers {
  approvedServers {
    id
    name
    description
    addedBy {
      name
    }
    chronicle {
      shortcut
      name
    }
    rates {
      xp
      sp
      adena
      drop
      spoil
    }
    openingAt
    createdAt
  }
}
    `;

/**
 * __useApprovedServersQuery__
 *
 * To run a query within a React component, call `useApprovedServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useApprovedServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApprovedServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useApprovedServersQuery(baseOptions?: Apollo.QueryHookOptions<ApprovedServersQuery, ApprovedServersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApprovedServersQuery, ApprovedServersQueryVariables>(ApprovedServersDocument, options);
      }
export function useApprovedServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApprovedServersQuery, ApprovedServersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApprovedServersQuery, ApprovedServersQueryVariables>(ApprovedServersDocument, options);
        }
export type ApprovedServersQueryHookResult = ReturnType<typeof useApprovedServersQuery>;
export type ApprovedServersLazyQueryHookResult = ReturnType<typeof useApprovedServersLazyQuery>;
export type ApprovedServersQueryResult = Apollo.QueryResult<ApprovedServersQuery, ApprovedServersQueryVariables>;
export const SignUpDocument = gql`
    mutation SignUp($name: String, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    id
    name
    email
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;