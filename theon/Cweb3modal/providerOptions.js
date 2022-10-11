import WalletConnect from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  walletlink: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "Web 3 Modal Demo", // Required
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // Required unless you provide a JSON RPC url; see `rpc` below
    },
  },
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
    },
    rpc: {
      1: "wss://mainnet.infura.io/v3/" + "27e484dcd9e3efcfd25a83a78777cdf1",
      42: "wss://kovan.infura.io/v3/" + "27e484dcd9e3efcfd25a83a78777cdf1",
    },
  },
};
