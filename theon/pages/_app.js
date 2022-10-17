import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
//moralis Auth

import { Web3Modal } from "@web3modal/react";
import { chains, providers } from "@web3modal/ethereum";
//layout components
import Layout from "../components/Layout";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";





//Web3Modal
const modalConfig = {
  theme: "dark",
  accentColor: "default",
  ethereum: {
    appName: "TheonNfts",
    chains: [
      chains.goerli,
      chains.mainnet,
      chains.rinkeby,
      chains.avalanche,
      chains.avalancheFuji,
      chains.polygon,
      chains.polygonMumbai,
    ],
    providers: [
      providers.walletConnectProvider({
        projectId: "a8dbfb8b580bd1d4147c2b24ab3a6d37",
      }),
    ],
    autoConnect: true,
  },
  projectId: "a8dbfb8b580bd1d4147c2b24ab3a6d37",
};
  import Nft from "../public/nft3.png";

function MyApp({ Component, pageProps }) {
  //   useEffect(() => {
  //   import("bootstrap/dist/js/bootstrap");
  // }, []);

  // useEffect(() => {
  //   typeof document !== undefined ? require('bootstrap/dist/js/bootstrap') : null
  // }, [])

  return (
    <div>
      <Head>
        {/* <link rel="icon" href="%PUBLIC_URL%/favicon.png" /> */}

        <meta name="description" content="TheonNfts" />
        <link rel="icon" href={Nft.src} />
        <title> TheonNfts</title>
        {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
      </Head>
      <Navbar />

      <Component {...pageProps} />
      <Web3Modal config={modalConfig} />

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default MyApp;
