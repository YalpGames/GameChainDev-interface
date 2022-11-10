import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

import {
    injectedWallet,
    rainbowWallet,
    metaMaskWallet,
    coinbaseWallet,
    walletConnectWallet,
    braveWallet,
    trustWallet,
    imTokenWallet,
  } from '@rainbow-me/rainbowkit/wallets';

export const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli, chain.rinkeby, chain.kovan, chain.ropsten],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID }),
        jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) }),
        publicProvider(),
    ],
);

const needsInjectedWalletFallback =
    typeof window !== "undefined" &&
    window.ethereum &&
    !window.ethereum.isMetaMask &&
    !window.ethereum.isCoinbaseWallet;

const connectors = connectorsForWallets([
    {
        groupName: "Popular",
        wallets: [
            metaMaskWallet({ chains, shimDisconnect: true }),
            braveWallet({ chains, shimDisconnect: true }),
            rainbowWallet({ chains }),
            walletConnectWallet({ chains }),
            coinbaseWallet({ appName: "Coinbase", chains }),
            ...(needsInjectedWalletFallback ? [injectedWallet({ chains, shimDisconnect: true })] : []),
        ],
    },
    {
        groupName: "Other",
        wallets: [
            trustWallet({ chains, shimDisconnect: true }),
            imTokenWallet({ chains })
            ],
    },
]);

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
});
