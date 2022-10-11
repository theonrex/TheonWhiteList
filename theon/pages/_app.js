import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
//moralis Auth
import {
  createClient,
  configureChains,
  defaultChains,
  WagmiConfig,
} from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { SessionProvider } from "next-auth/react";

const { provider, webSocketProvider } = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});


//layout components
import Layout from "../components/Layout";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


function MyApp({ Component, pageProps }) {
  //   useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);

  // useEffect(() => {
  //   typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  // }, [])

  return (
    <WagmiConfig client={client}>
      <SessionProvider session={pageProps.session} refetchInterval={0}>
        <Head>
          <title>Whitelist Dapp</title>
          <meta name="description" content="Whitelist-Dapp" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />

        <Component {...pageProps} />
        <footer>
          <Footer />
        </footer>
      </SessionProvider>
    </WagmiConfig>
  );
}

export default MyApp;
