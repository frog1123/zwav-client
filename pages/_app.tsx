import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { useState } from 'react';

import { UserContext } from '../UserContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [value, setValue] = useState({
    reloadPostsList: false
  });

  return (
    <ApolloProvider client={client}>
      <UserContext.Provider value={{ value, setValue }}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </ApolloProvider>
  );
}

export default MyApp;
