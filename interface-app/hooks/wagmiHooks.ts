import { useContract,useAccount, useContractRead, useContractWrite ,useNetwork,usePrepareContractWrite } from "wagmi";
import  MainTokenABI  from "../contractsAbis/token/Token.sol/MainToken.json";
import type { MainToken } from "../contractsTypes/token/Token.sol/MainToken";
import { MAINTOKEN_ADDRESSES ,ZERO_ADDRESS} from "../config/constants/addresses";
import * as React from 'react';
import { ethers } from "ethers";

/*//////////////////////////////////////////////////////////////
                              CROWD FACTORY
//////////////////////////////////////////////////////////////*/

export function useMainTokenContract(): MainToken {
  const { chain  } = useNetwork();
  const contractAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;

  const contract = useContract({
    address: contractAddress,
    abi: MainTokenABI,
  });

  return contract as MainToken;
}

export function useMainTokenBalanceOf({ address }: { address?: string }) {
    const { address: _address } = useAccount();
    const { chain } = useNetwork();
    const MainTokenAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;
  
    return useContractRead({
      address: MainTokenAddress || ZERO_ADDRESS,
      abi: MainTokenABI,
      functionName: 'balanceOf',
      args: [address ?? _address] 
    });
}

export function useMainTokenMint({amount}:{amount:number}){
    const { address, isConnecting, isDisconnected } = useAccount();
    const { chain } = useNetwork();
    const MainTokenAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;

    const {config} = usePrepareContractWrite({
        address: MainTokenAddress || ZERO_ADDRESS,
        abi: [
            {
                "inputs": [
                  {
                    "internalType": "address",
                    "name": "recipient",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                  }
                ],
                "name": "mint",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
              },
          ],
        functionName: 'mint',
        args: [address!,ethers.BigNumber.from(amount)] 
      });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);
    
}