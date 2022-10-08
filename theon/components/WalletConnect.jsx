import React from "react";
import { useEffect, useRef, useState } from "react";
import Web3Modal from "web3modal";
import WalletConnect from "@walletconnect/web3-provider";
import { ethers, providers } from "ethers";
import { providerOptions } from "./providerOptions";



let web3Modal;
if (typeof window !== "undefined") {
	web3Modal = new Web3Modal({
		cacheProvider: true,
			network: "goerli",
		providerOptions, // required
		theme: "dark",
	});
}

export const WalletConnects = () => {
	const [provider, setProvider] = useState();
	const [library, setLibrary] = useState();
	const [account, setAccount] = useState();
	const [network, setNetwork] = useState();

	const connectWallet = async () => {
		try {
			const provider = await web3Modal.connect();
			const library = new ethers.providers.Web3Provider(provider);
			const accounts = await library.listAccounts();
			const network = await library.getNetwork();
			setProvider(provider);
			setLibrary(library);
			if (accounts) setAccount(accounts[0]);
			setNetwork(network);
			// If user is not connected to the Goerli network, let them know and throw an error
			const { chainId } = await library.getNetwork();
			if (chainId !== 5) {
				window.alert("change to goerli network");
				throw new Error("Change Network TO Goerli");
			}
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		if (provider?.on) {
			const handleAccountsChanged = (accounts) => {
			};

			const handleChainChanged = (chainId) => {
				setChainId(chainId);
			};

			const handleDisconnect = () => {
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

	//track wallet
	const refreshState = () => {
		setAccount();
	};

	const disconnect = async () => {
		await web3Modal.clearCachedProvider();
		refreshState();
	};
	// hook to automatically connect to the cached provider
useEffect(() => {
  if (web3Modal.cachedProvider) {
    connectWallet();
  }
}, []);
	return (
		<div>
			{
				!account ? <span onClick={connectWallet}> Connect Wallet </span>
	 :
			<span onClick={disconnect}> Disconnect Wallet </span>
			}
		</div>
	);
};



export const getProviderOrSigner = async (needSigner = false) => {
	// Connect to Metamask
	// Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
	const provider = await web3Modal.connect();
	const web3Provider = new providers.Web3Provider(provider);

	// If user is not connected to the Goerli network, let them know and throw an error
	// const { chainId } = await web3Provider.getNetwork();
	// if (chainId !== 5) {
	// 	window.alert("change to goerli network");
	// 	throw new Error("Change Network TO Goerli");
	// }

	if (needSigner) {
		const signer = web3Provider.getSigner();
		return signer;
	}
	return web3Provider;
};
