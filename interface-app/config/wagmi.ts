import { connectorsForWallets,Chain } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient ,useContractWrite} from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import  MainTokenABI  from "../contractsAbis/token/Token.sol/MainToken.json";

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


const MumbaiChain: Chain = {
id: 80001,
name: 'Mumbai',
network: 'mumbai',
iconUrl: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
iconBackground: '#fff',
nativeCurrency: {
    decimals: 18,
    name: 'Matic Token',
    symbol: 'MATIC',
},
rpcUrls: {
    default: 'https://rpc-mumbai.maticvigil.com/',
},
blockExplorers: {
    default: { name: 'polygonscan', url: 'https://mumbai.polygonscan.com/' },
},
testnet: false,
};

  
export const { chains, provider, webSocketProvider } = configureChains(
    [chain.mainnet, chain.goerli,MumbaiChain],
    [
        alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID!}),
        jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default}) }),
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
