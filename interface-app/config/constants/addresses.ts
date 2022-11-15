import { ChainId } from "./chainId";
export type AddressMap = { [chainId: number]: string };

export const MAINTOKEN_ADDRESSES:AddressMap = {
    [ChainId.GÖRLI]: "0xca41f293A32d25c2216bC4B30f5b0Ab61b6ed2CB",
    [ChainId.ETHEREUM]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.PRIVATE] : "0xe4f86a43fd5bF8e021c64CC2E8b6BDf0b757881b",
    [ChainId.MUMBAI] : "0xAA5374C7133a442710b8D269eb52e50F8b9723c0",
};

export const VETOKEN_ADDRESSES:AddressMap = {
    [ChainId.GÖRLI]: "0xca41f293A32d25c2216bC4B30f5b0Ab61b6ed2CB",
    [ChainId.PRIVATE] : "0xe4f86a43fd5bF8e021c64CC2E8b6BDf0b757881b",
    [ChainId.MUMBAI] : "0xf727B29E8aCBBcceA7e1b48b8A947B95c1B423BB",
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';