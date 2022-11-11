import { env } from "../env";
import { ChainId } from "./chainId";

export class RPC {
    public static env = process.env;
    
    private static _get(args: { key: string; err?: string; first?: boolean; fallback?: string }) {
        const value = this.env[args.key] || args.fallback;
        if (!value) console.warn(args.err);

        if (this.env[args.key] === undefined) return args.fallback
        else return args.fallback;
    }

    public static getNodeUrls = (chainId: ChainId) => {
        switch (chainId) {
            case ChainId.ETHEREUM:
                return this._get({
                    key: `REACT_APP_ETHEREUM_NODE_URL`,
                    fallback: `https://eth-mainnet.alchemyapi.io/v2/${env.alchemyId}`,
                });
            case ChainId.GÖRLI:
                return this._get({
                    key: `REACT_APP_RINKEBY_NODE_URL`,
                    fallback: `https://eth-rinkeby.alchemyapi.io/v2/${env.alchemyId}`,
                });
        }
    };
}
