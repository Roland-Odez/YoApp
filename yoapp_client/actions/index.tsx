"use server"

import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client';

export const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });


export const login = () => {
        const LOGIN_USER = gql`

                mutation LoginSignUp($loginInput: LoginInput!) {

                    logIn(loginInput: $loginInput) {
                        ... on SuccessPayload {
                            token
                            user {
                                email,
                                username
                            }
                        }
                        ... on FailedPayload {
                        message
                        }
                    }
                }
        `
    const { loading, error, data } = useQuery(LOGIN_USER);


}