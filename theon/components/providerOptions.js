import WalletConnect from "@walletconnect/web3-provider";

export const providerOptions = {
  walletconnect: {
    package: WalletConnect, // required
    options: {
      infuraId: "3c47dc003d7c4d3e87c13e1bc25b36ee", // required
    },
    rpc: {
      5: "https://goerli.infura.io/v3/3c47dc003d7c4d3e87c13e1bc25b36ee",
    },
  },
};
