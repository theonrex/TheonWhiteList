import React from "react";
import styles from "../styles/Home.module.css";
import HomeBanner from "../components/HomeBanner";
import Footer from "../components/Footer";
import Wallets from "../components/Wallets";
import { useAccount, ConnectButton, UseDisconnect } from "@web3modal/react";

export default function Home({ children }) {
  // const { address, isConnected } = useAccount();
  // if (!isConnected) {
  //   return <ConnectButton />;
  // }
  return (
    <div>
      <main>
        <HomeBanner />
        {/* <h1>
          Your address is {address}
        </h1> */}

        <Wallets />
      </main>
    </div>
  );
}
