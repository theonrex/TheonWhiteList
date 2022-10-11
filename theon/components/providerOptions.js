import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "27e484dcd9e3efcfd25a83a78777cdf1", // required
    },
    rpc: {
      1: "wss://mainnet.infura.io/v3/" + "27e484dcd9e3efcfd25a83a78777cdf1",
      42: "wss://kovan.infura.io/v3/" + "27e484dcd9e3efcfd25a83a78777cdf1",
      137:
        "wss://polygon-mainnet.infura.io/v3/" +
        "27e484dcd9e3efcfd25a83a78777cdf1",
      80001: "wss://rpc-mumbai.matic.today",
    },
  },
};
