import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/core";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { Container } from "../components/Container";
import { LogoutButton } from "../components/LogoutButton";
import apolloClient from "../lib/apolloClient";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS theme={theme}>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;500;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Container>
          <LogoutButton />
          <Component {...pageProps} />
        </Container>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default MyApp;
