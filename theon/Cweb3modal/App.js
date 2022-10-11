import React from "react";
import { useEffect, useState } from "react";
import {
  div,
  Button,
  Text,
  section,
  Select,
  Input,
  h5,
} from "@chakra-ui/react";
// import { div, div } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import { networkParams } from "./networks";
import { toHex, truncateAddress } from "./utils";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { providerOptions } from "./providerOptions";

// const web3Modal = new Web3Modal({
//   cacheProvider: true, // optional
//   providerOptions, // required
// });

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    cacheProvider: true,
    network: "goerli",
    providerOptions, // required
    theme: "dark",
    disableInjectedProvider: false,
  });
}

export default function Home() {
  const [provider, setProvider] = useState();
  const [library, setLibrary] = useState();
  const [account, setAccount] = useState();
  const [signature, setSignature] = useState("");
  const [error, setError] = useState("");
  const [chainId, setChainId] = useState();
  const [network, setNetwork] = useState();
  const [message, setMessage] = useState("");
  const [signedMessage, setSignedMessage] = useState("");
  const [verified, setVerified] = useState();

  const connectWallet = async () => {
    try {
      const provider = await web3Modal.connect();
      const library = new ethers.providers.Web3Provider(provider);
      const accounts = await library.listAccounts();
      const network = await library.getNetwork();
      setProvider(provider);
      setLibrary(library);
      if (accounts) setAccount(accounts[0]);
      setChainId(network.chainId);
    } catch (error) {
      setError(error);
    }
  };

  const handleNetwork = (e) => {
    const id = e.target.value;
    setNetwork(Number(id));
  };

  const handleInput = (e) => {
    const msg = e.target.value;
    setMessage(msg);
  };

  const switchNetwork = async () => {
    try {
      await library.provider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(network) }],
      });
    } catch (switchError) {
      if (switchError.code === 4902) {
        try {
          await library.provider.request({
            method: "wallet_addEthereumChain",
            params: [networkParams[toHex(network)]],
          });
        } catch (error) {
          setError(error);
        }
      }
    }
  };

  const signMessage = async () => {
    if (!library) return;
    try {
      const signature = await library.provider.request({
        method: "personal_sign",
        params: [message, account],
      });
      setSignedMessage(message);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };

  const verifyMessage = async () => {
    if (!library) return;
    try {
      const verify = await library.provider.request({
        method: "personal_ecRecover",
        params: [signedMessage, signature],
      });
      setVerified(verify === account.toLowerCase());
    } catch (error) {
      setError(error);
    }
  };

  const refreshState = () => {
    setAccount();
    setChainId();
    setNetwork("");
    setMessage("");
    setSignature("");
    setVerified(undefined);
  };

  const disconnect = async () => {
    await web3Modal.clearCachedProvider();
    refreshState();
  };

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts) => {
        console.log("accountsChanged", accounts);
        if (accounts) setAccount(accounts[0]);
      };

      const handleChainChanged = (_hexChainId) => {
        setChainId(_hexChainId);
      };

      const handleDisconnect = () => {
        console.log("disconnect", error);
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return (
    <>
      <h1>If you're in the sandh5, first "Open in New Window" ⬆️</h1>
      <div >
        <section >
          <h5>Let's connect with</h5>
          <h5
           
          >
            Web3Modal
          </h5>
        </section>
        <section>
          {!account ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <button onClick={disconnect}>Disconnect</button>
          )}
        </section>
        <div >
          <section>
            <h5>{`Connection Status: `}</h5>
            {account ? <div color="green" /> : <div color="#cd5700" />}
          </section>

          {/* <Tooltip label={account} placement="right">
            <h5>{`Account: ${truncateAddress(account)}`}</h5>
          </Tooltip> */}
          <h5>{`Network ID: ${chainId ? chainId : "No Network"}`}</h5>
        </div>
        {account && (
          <section >
            <h5
             
            >
              <div>
                {/* <Button onClick={switchNetwork} isDisabled={!network}>
                  Switch Network
                </Button> */}
                <Select placeholder="Select network" onChange={handleNetwork}>
                  <option value="3">Ropsten</option>
                  <option value="4">Rinkeby</option>
                  <option value="42">Kovan</option>
                  <option value="1666600000">Harmony</option>
                  <option value="42220">Celo</option>
                </Select>
              </div>
            </h5>
            <h5
             
            >
              <div>
                {/* <button onClick={signMessage} isDisabled={!message}>
                  Sign Message
                </button> */}
                <input
                  placeholder="Set Message"
                  onChange={handleInput}
                  w="140px"
                />
                {signature ? (
                  <div label={signature} placement="bottom">
                    <h5>{`Signature: ${truncateAddress(signature)}`}</h5>
                  </div>
                ) : null}
              </div>
            </h5>
            <h5
             
            >
              <div>
                {/* <button onClick={verifyMessage} isDisabled={!signature}>
                  Verify Message
                </button> */}
                {verified !== undefined ? (
                  verified === true ? (
                    <div>
                      <div color="green" />
                      <h5>Signature Verified!</h5>
                    </div>
                  ) : (
                    <div>
                      <div color="red" />
                      <h5>Signature Denied!</h5>
                    </div>
                  )
                ) : null}
              </div>
            </h5>
          </section>
        )}
        <h5>{error ? error.message : null}</h5>
      </div>
    </>
  );
}
