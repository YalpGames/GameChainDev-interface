import { ChainId } from "./chainId";
export type AddressMap = { [chainId: number]: string };

export const MAINTOKEN_ADDRESSES:AddressMap = {
    [ChainId.GÖRLI]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.ETHEREUM]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.PRIVATE] : "0xe4f86a43fd5bF8e021c64CC2E8b6BDf0b757881b",
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';