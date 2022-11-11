import { ChainId } from "./chainId";
export type AddressMap = { [chainId: number]: string };

export const MAINTOKEN_ADDRESSES:AddressMap = {
    [ChainId.RINKEBY]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
    [ChainId.ETHEREUM]: "0x1dd03A699CAE66F7DBb9aCEc62c50cc2631e48B9",
};

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';