import { BasciConnect, } from "../ConnectWallet";
import { MAINTOKEN_ADDRESSES ,ZERO_ADDRESS} from "../../config/constants/addresses";
import { ChainId } from "../../config/constants/chainId";
import { useDynamicExampleContract, useStaticExampleContract } from "../../hooks/useContract";
import { useEffect, useState } from "react";
import { useAccount,useContractRead ,useNetwork,useContractWrite } from "wagmi";
import  MainTokenABI  from "../../contractsAbis/token/Token.sol/MainToken.json";
import {useMainTokenBalanceOf,useMainTokenMint,useMainTokenName} from "../../hooks/wagmiHooks";
import xentestAbi from "./xentestAbi.json";
import { ethers } from "ethers";

const TokenApp = () => {
    // const StaticExampleInstance = useStaticExampleContract(MAINTOKEN_ADDRESSES[ChainId.PRIVATE], ChainId.PRIVATE);
    // const DynamicExampleInstance = useDynamicExampleContract(MAINTOKEN_ADDRESSES, true);

    const [amount, setAmount] = useState(10);
    const { isConnected, address} = useAccount();
    const { chain } = useNetwork();
    const MainTokenAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;
    const balanceMainToken = "0";
    
    const {data: tokenName} =  useContractRead({
        address: MainTokenAddress || ZERO_ADDRESS,
        abi: MainTokenABI,
        functionName: 'name',
        //chainId: chain.id || 1,
        // onSettled(data, error) {
        //     console.log('read name', { data, error })
        //   },
      });

    const {data: balanceOfToken} =  useContractRead({
        address: MainTokenAddress || ZERO_ADDRESS,
        abi: MainTokenABI,
        functionName: 'balanceOf',
        args: [address],
        //chainId: chain.id || 1,
      });
    if(balanceOfToken != undefined){
         balanceMainToken = ethers.utils.formatEther(balanceOfToken);   
    }
    //   console.log(`user balance: ${balanceMainToken}\n`);
    
    const handleSetAmount = (ev) => {
        let amount = parseInt(ev.target.value, 10);
        if (!amount || amount <= 0) {
            amount = 1;
        }
        setAmount(amount);
    };

    const { writeAsync } = useContractWrite({
        mode: "recklesslyUnprepared",
        address: MainTokenAddress || ZERO_ADDRESS,
        abi: MainTokenABI,
        functionName: "mint",
        args: [address,ethers.utils.parseEther(amount.toString())]
    });

    const hanldeMint = () => {
    writeAsync().then(() => {
        alert("✅ Tx sended!");
    });
    };

    useEffect(() => {
        setAmount(amount);
    }, [amount]);

    return (
        <div>
            <div>
                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "24px",
                    }}
                >
                    Name (
                    <span
                        style={{
                            color: "gray",
                        }}
                    >
                        token name
                    </span>
                    ) :{tokenName}
                </div>

                <div
                    style={{
                        width: "100%",
                        textAlign: "center",
                        fontSize: "24px",
                    }}
                >
                    Amount (
                    <span
                        style={{
                            color: "gray",
                        }}
                    >
                        read Contract
                    </span>
                    ) :{balanceMainToken ? balanceMainToken : "0"}
                </div>
                <>
                    {isConnected ? (
                        <div>
                            <div className="bd" 
                                style={{
                                    width: "100%",
                                    textAlign: "center",
                                    fontSize: "24px",
                                }}>
                                数量 -- (amount):
                                <input value={amount} onChange={handleSetAmount} />
                            </div>
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
                            >
                            <button onClick={hanldeMint}>mintToken (Witch Mint)</button>
                            </div>
                        </div>
                    ) : (
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                        </div>
                    )}
                </>
            </div>
        </div>
    );
};

export default TokenApp;
