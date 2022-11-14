import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css'
import { chains, wagmiClient } from "../config/wagmi";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import "../styles/globals.css";
// import "../styles/rainbowkit.css";
import { WagmiConfig } from "wagmi";
import  FirstPost from "./posts/fist-post";

function MyApp({ Component, pageProps }: AppProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
