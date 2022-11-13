import { BasciConnect, } from "../ConnectWallet";
import { MAINTOKEN_ADDRESSES } from "../../config/constants/addresses";
import { ChainId } from "../../config/constants/chainId";
import { useDynamicExampleContract, useStaticExampleContract } from "../../hooks/useContract";
import { useEffect, useState } from "react";
import { useAccount,useContractRead  } from "wagmi";
import  MainTokenABI  from "../../contractsAbis/token/Token.sol/MainToken.json";
import {useMainTokenBalanceOf,useMainTokenMint,useMainTokenName} from "../../hooks/wagmiHooks";

const TokenApp = () => {
    // const StaticExampleInstance = useStaticExampleContract(MAINTOKEN_ADDRESSES[ChainId.PRIVATE], ChainId.PRIVATE);
    // const DynamicExampleInstance = useDynamicExampleContract(MAINTOKEN_ADDRESSES, true);
    const [count, setCount] = useState("");
    const { isConnected, address} = useAccount();
    console.log("1111111111111111111111111111111111111111111111111");
    console.log(address);

    useEffect(() => {
        init("0");
    }, []);

    const init = async (count:string) => {
      //  const count = await StaticExampleInstance.balanceOf(address);
        setCount(count.toString());
    };

    return (
        <div>
            <div>
                <BasciConnect></BasciConnect>

                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "24px",
                    }}
                >
                    count (
                    <span
                        style={{
                            color: "gray",
                        }}
                    >
                        read Contract
                    </span>
                    ) :{count ? count : 0}
                </div>
                <>
                    {isConnected ? (
                        <div>
                            <div
                                style={{
                                    width: "200px",
                                    height: "50px",
                                    backgroundColor: "#0076F7",
                                    color: "white",
                                    borderRadius: "20px",
                                    textAlign: "center",
                                    lineHeight: "50px",
                                    fontSize: "14px",
                                    margin: "0 auto",
                                    cursor: "pointer",
                                }}
                                onClick={async () => {
                                    // try {
                                    //    // console.log(DynamicExampleInstance);

                                    // //    const tx = await DynamicExampleInstance?.mint(address,1000);
                                    // const { data:  name } = useMainTokenName();
                                    // console.log("2222222222222222222222222222222222222222222222");
                                    // console.log(name);
                                    // init(name);
                                    // } catch (error) {
                                    //     console.log(error);
                                    // }
                                    const { data:  name } = useMainTokenName();
                                    console.log("2222222222222222222222222222222222222222222222");
                                    console.log(name);
                                }}
                            >
                                setCount(write Contract)
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <BasciConnect></BasciConnect>
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default TokenApp;
