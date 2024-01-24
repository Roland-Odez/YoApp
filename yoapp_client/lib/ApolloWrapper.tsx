'use client'
import { ApolloClient,ApolloProvider, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  });

  export const ApolloWrapper = ({children}: React.PropsWithChildren) => {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
  }