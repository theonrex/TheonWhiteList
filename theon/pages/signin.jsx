import React from "react";

import { signIn } from "next-auth/react";
import { useAccount, useConnect, useSignMessage, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import axios from "axios";

function SignIn() {
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();

  const handleAuth = async (wal) => {
    if (isConnected) {
      await disconnectAsync();
    }

    console.log("Connect To Site Via Wallet");

    const userData = { network: "evm" };

    if (wal === "meta") {
      const { account, chain } = await connectAsync({
        connector: new MetaMaskConnector({}),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    if (wal === "coin") {
      const { account, chain } = await connectAsync({
        connector: new CoinbaseWalletConnector({}),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    if (wal === "wal") {
      const { account, chain } = await connectAsync({
        connector: new WalletConnectConnector({ options: { qrcode: true } }),
      });
      userData.address = account;
      userData.chain = chain.id;
    }

    console.log("Sending Connected Account and Chain ID to Moralis Auth API");

    const { data } = await axios.post("/api/auth/request-message", userData, {
      headers: {
        "content-type": "application/json",
      },
    });

    console.log("Received Signature Request From Moralis Auth API");

    const message = data.message;

    const signature = await signMessageAsync({ message });

    console.log("Succesful Sign In, Redirecting to User Page");

    const { url } = await signIn("credentials", {
      message,
      signature,
      redirect: false,
      callbackUrl: "/user",
    });

    push(url);
  };

  return (
    <div className="container">
      <div className="rowx theonrex_nft_sign">
        <section className="col40">
          <h3 className="sign_in_text">
            Welcome to <span className="home_banner_span">TheonNFTs</span>{" "}
          </h3>
          <p> Connect Your Wallet To Join The Whitelist</p>
          <button className="explore_btn" onClick={() => handleAuth("meta")}>
            Authenticate via Metamask
          </button>
          <br />
          <button className="explore_btn" onClick={() => handleAuth("coin")}>
            Authenticate via Coinbase
          </button>
          <br />
          <button className="explore_btn" onClick={() => handleAuth("wal")}>
            Authenticate via Wallet Connect
          </button>
        </section>
        <section className="col60 theonrex_nft">
          <img
            src="https://theonrex.github.io/theon-NFT-Page/images/back.png"
            alt="nft"
          />
        </section>
      </div>
    </div>
  );
}

export default SignIn;