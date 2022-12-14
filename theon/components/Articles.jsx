import React from 'react'

const Articles = () => {
  return (
    <div></div>
  )
}

export default Articles

// import React from "react";
// import Web3Modal from "web3modal";
// import { ethers, providers, Contract } from "ethers";
// import { useEffect, useRef, useState } from "react";
// import { WHITELIST_CONTRACT_ADDRESS, abi } from "../constants";
// // import { providerOptions } from "./providerOptions";
// // import { getProviderOrSigner } from './WalletConnect';
// import { providerOptions } from "./providerOptions";

// let web3Modal;
// if (typeof window !== "undefined") {
//   web3Modal = new Web3Modal({
//     cacheProvider: false,
//     network: "goerli",
//     providerOptions, // required
//     theme: "dark",
//     disableInjectedProvider: false,
//   });
// }
// import {
//   useAccount,
//   ConnectButton,
//   useDisconnect,
//   useConnectModal,
// } from "@web3modal/react";

// const Whitelist = () => {
//   // walletConnected keep track of whether the user's wallet is connected or not
//   const [walletConnected, setWalletConnected] = useState(false);
//   // joinedWhitelist keeps track of whether the current metamask address has joined the Whitelist or not
//   const [joinedWhitelist, setJoinedWhitelist] = useState(false);
//   // loading is set to true when we are waiting for a transaction to get mined
//   const [loading, setLoading] = useState(false);
//   // numberOfWhitelisted tracks the number of addresses's whitelisted
//   const [numberOfWhitelisted, setNumberOfWhitelisted] = useState(0);
//   // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
//   const web3ModalRef = useRef();
//   const { address, isConnected } = useAccount();
//   const { isOpen, open, close } = useConnectModal();

//   const getProviderOrSigner = async (needSigner = false) => {
//     //connect to metamask
//     const provider = await web3Modal.connect();
//     const web3Provider = new ethers.providers.Web3Provider(provider);
//     // If user is not connected to the GoerliETH network, let them know and throw an error
//     const { chainId } = await web3Provider.getNetwork();
//     if (chainId !== 5) {
//       window.alert("change to goerli network");
//       throw new Error("Change Network TO Goerli");
//     }

//     if (needSigner) {
//       const signer = web3Provider.getSigner();
//       return signer;
//     }
//     return web3Provider;
//   };

//   /**
//    * addAddressToWhitelist: Adds the current connected address to the whitelist
//    */
//   const addAddressToWhitelist = async () => {
//     try {
//       //signer is needed since its a write transaction
//       const signer = await getProviderOrSigner(true);
//       // Create a new instance of the Contract with a Signer, which allows
//       // update methods
//       const whitelistContract = new Contract(
//         WHITELIST_CONTRACT_ADDRESS,
//         abi,
//         signer
//       );
//       // call the addAddressToWhitelist from the contract
//       const tx = await whitelistContract.addAddressToWhitelist();
//       setLoading(true);
//       // wait for the transaction to get mined
//       await tx.wait();
//       setLoading(false);
//       // get the updated number of addresses in the whitelist
//       await getNumberOfWhitelisted();
//       setJoinedWhitelist(true);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /**
//    * getNumberOfWhitelisted:  gets the number of whitelisted addresses
//    */
//   const getNumberOfWhitelisted = async () => {
//     try {
//       // Get the provider from web3Modal, which in our case is MetaMask
//       // No need for the Signer here, as we are only reading state from the blockchain
//       const provider = await getProviderOrSigner();
//       // We connect to the Contract using a Provider, so we will only
//       // have read-only access to the Contract
//       const whitelistContract = new Contract(
//         WHITELIST_CONTRACT_ADDRESS,
//         abi,
//         provider
//       );
//       // call the numAddressesWhitelisted from the contract
//       const _numberOfWhitelisted =
//         await whitelistContract.numAddressesWhitelisted();
//       setNumberOfWhitelisted(_numberOfWhitelisted);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /**
//    * checkIfAddressInWhitelist: Checks if the address is in whitelist
//    */
//   const checkIfAddressInWhitelist = async () => {
//     try {
//       // We will need the signer later to get the user's address
//       // Even though it is a read transaction, since Signers are just special kinds of Providers,
//       // We can use it in it's place
//       const signer = await getProviderOrSigner(true);
//       const whitelistContract = new Contract(
//         WHITELIST_CONTRACT_ADDRESS,
//         abi,
//         signer
//       );
//       // Get the address associated to the signer which is connected to  MetaMask
//       const address = await signer.getAddress();
//       // call the whitelistedAddresses from the contract
//       const _joinedWhitelist = await whitelistContract.whitelistedAddresses(
//         address
//       );
//       setJoinedWhitelist(_joinedWhitelist);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   /*
//     connectWallet: Connects the MetaMask wallet
//   */
//   const connectWallet = async () => {
//     try {
//       // Get the provider from web3Modal, which in our case is MetaMask
//       // When used for the first time, it prompts the user to connect their wallet
//       // await getProviderOrSigner();
//       // setWalletConnected(true);

//       checkIfAddressInWhitelist();
//       getNumberOfWhitelisted();
//     } catch (err) {
//       console.error(err);
//     }
//   };
//   const renderButton = () => {
//     if (isConnected) {
//       if (joinedWhitelist) {
//         return <div>Thanks for joining the Whitelist!</div>;
//       } else if (loading) {
//         return <button>Loading...</button>;
//       } else {
//         return (
//           <button className="explore_btn" onClick={addAddressToWhitelist}>
//             Join the Whitelist
//           </button>
//         );
//       }
//     } else {
//       return (
//         <button className="explore_btn" onClick={open}>
//           Connect your wallet
//         </button>
//       );
//     }
//   };

//   // useEffects are used to react to changes in state of the website
//   // The array at the end of function call represents what state changes will trigger this effect
//   // In this case, whenever the value of `walletConnected` changes - this effect will be called
//   useEffect(() => {
//     //   // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet

//     connectWallet();
//   }, []);

//   // async function getString() {
//   // 	// test if wallet is connected
//   // 	if (web3Modal.cachedProvider) {
//   // 		// connected now you can get accounts
//   // 		const accounts = await web3.eth.getAccounts();
//   // 		console.log(accounts);
//   // 	}
//   // }
//   if (!isConnected) {
//     return (
//       <div className="ConnectButton ">
//         <button onClick={open}> Connect Wallet</button>
//       </div>
//     );
//   }

//   const disconnect = useDisconnect();

//   return (
//     <div>
//       <div className="numOf_Whitelised_Addrr">
//         {/* <p>
//           Your address is <br />  {address}
//         </p> */}
//         No of Address in the whitelist : {numberOfWhitelisted}
//       </div>
//       <div>{renderButton()}</div>
//       <button onClick={disconnect}>Disconnect</button>
//     </div>
//   );
// };

// export default Whitelist;
