'use client'
import { UserContext } from '@/context/user/UserContext';

import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useContext } from 'react';

// Create an HTTP link
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL, // Replace with your GraphQL endpoint
});

// Create a middleware link to set headers
const authLink = (token: string) => {
  return  setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
}



  export const ApolloWrapper = ({children}: React.PropsWithChildren) => {
    const {state} = useContext(UserContext)
    const client = new ApolloClient({
      link: authLink(state?.token).concat(httpLink),
      cache: new InMemoryCache(),
    });
    // if(state.token !== ""){
      return (
          <ApolloProvider client={client}>
              {children}
          </ApolloProvider>
      )
    // }
  }