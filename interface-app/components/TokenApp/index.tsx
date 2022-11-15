import { BasciConnect } from "../ConnectWallet";
import {
	MAINTOKEN_ADDRESSES,
	ZERO_ADDRESS,
} from "../../config/constants/addresses";
import { ChainId } from "../../config/constants/chainId";
import {
	useDynamicExampleContract,
	useStaticExampleContract,
} from "../../hooks/useContract";
import React, { useEffect, useState } from "react";
import {
	useAccount,
	useContractRead,
	useNetwork,
	useContractWrite,
} from "wagmi";
import MainTokenABI from "../../contractsAbis/token/Token.sol/MainToken.json";
import {
	useMainTokenBalanceOf,
	useMainTokenMint,
	useMainTokenName,
} from "../../hooks/wagmiHooks";
import { ethers } from "ethers";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const TokenApp = () => {
	// const StaticExampleInstance = useStaticExampleContract(MAINTOKEN_ADDRESSES[ChainId.PRIVATE], ChainId.PRIVATE);
	// const DynamicExampleInstance = useDynamicExampleContract(MAINTOKEN_ADDRESSES, true);

	const [amount, setAmount] = useState(10);
	const { isConnected, address } = useAccount();
	const { chain } = useNetwork();
	const MainTokenAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;
	const balanceMainToken = "0";

	const { data: tokenName } = useContractRead({
		address: MainTokenAddress || ZERO_ADDRESS,
		abi: MainTokenABI,
		functionName: "name",
		chainId: chain?.id,
		onSettled(data, error) {
			console.log("read name", { data, error });
		},
	});
    console.log(`tokenName:${tokenName}`);
    
	const { data: balanceOfToken } = useContractRead({
		address: MainTokenAddress || ZERO_ADDRESS,
		abi: MainTokenABI,
		functionName: "balanceOf",
		args: [address],
		//chainId: chain.id || 1,
	});
	console.log(`chainid:${chain?.id}`);
	console.log(`address:${address}`);
	console.log(`MainTokenAddress:${MainTokenAddress}`);
	console.log(`balanceOfToken:${balanceOfToken}`);

	if (balanceOfToken != undefined) {
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
		args: [address, ethers.utils.parseEther(amount.toString())],
	});

	const hanldeMint = () => {
		writeAsync().then(() => {
			alert("✅ Tx sended!");
		});
	};

	useEffect(() => {
		setAmount(amount);
	}, [amount]);

	const bull = (
        <Box
          component="span"
          sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
          •
        </Box>
      );
      
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
             Yalp Token Info
            </Typography>
            <Typography variant="h5" component="div">
			Name{bull}(token name): {tokenName}
            </Typography>
            <Typography variant="h5" component="div">
			Amount{bull}(usr amount): {balanceMainToken ? balanceMainToken : "0"}
            </Typography>
          </CardContent>
			<TextField id="outlined-basic" label="Outlined" variant="outlined" value={amount} onChange={handleSetAmount} >
				Mint Amount
			</TextField>
			<Button onClick={hanldeMint} variant="contained" href="#contained-buttons">Mint Token</Button>
        </React.Fragment>
      );

	return (
		<div style={{
			width: "100%",
			textAlign: "center",
			fontSize: "24px",
		}}>
		  <Box sx={{ minWidth: 315 }}>
		  {isConnected ? (
		  <Card variant="outlined">{card}</Card>
		  ) :(
			<div
				style={{
					display: "flex",
					justifyContent: "center",
				}}
			></div>
		)}
          </Box>
		</div>
		
	);
};

export default TokenApp;
