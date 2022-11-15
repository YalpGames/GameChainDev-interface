import {
	VETOKEN_ADDRESSES,
	MAINTOKEN_ADDRESSES,
	ZERO_ADDRESS,
} from "../../config/constants/addresses";
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
	useBlockNumber,
	useProvider,
} from "wagmi";
import VotingEscrowABI from "../../contractsAbis/token/VotingEscrow.sol/VotingEscrow.json";

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
import { log } from "console";
import MainTokenABI from "../../contractsAbis/token/Token.sol/MainToken.json";
import Slider from '@mui/material/Slider';

const VotingEscrow = () => {
	// const StaticExampleInstance = useStaticExampleContract(MAINTOKEN_ADDRESSES[ChainId.PRIVATE], ChainId.PRIVATE);
	// const DynamicExampleInstance = useDynamicExampleContract(MAINTOKEN_ADDRESSES, true);

	const [amount, setAmount] = useState(10);
	const [lockTime,setLockTime] = useState(0);
	const [timeStamp,settimeStamp] = useState(0);
	const { isConnected, address } = useAccount();
	const { chain } = useNetwork();
	const VeTokenAddress = chain ? VETOKEN_ADDRESSES[chain.id] : undefined;
	const balanceVeToken = "0";
	const MainTokenAddress = chain ? MAINTOKEN_ADDRESSES[chain.id] : undefined;
	const balanceMainToken = "0";
	
	const { data: balanceOfToken } = useContractRead({
		address: MainTokenAddress || ZERO_ADDRESS,
		abi: MainTokenABI,
		functionName: "balanceOf",
		args: [address],
		//chainId: chain.id || 1,
	});
	if (balanceOfToken != undefined) {
		balanceMainToken = ethers.utils.formatEther(balanceOfToken);
	}
	const { data: vetokenName } = useContractRead({
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "name",
		chainId: chain?.id,
		onSettled(data, error) {
			console.log("read name", { data, error });
		},
	});
    console.log(`tokenName:${vetokenName}`);
    
	const { data: veSymbol } = useContractRead({
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "symbol",
		chainId: chain?.id,
		onSettled(data, error) {
			console.log("read name", { data, error });
		},
	});

	const { data: totalSupplyAt } = useContractRead({
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "totalSupplyAt",
		chainId: chain?.id,
		onSettled(data, error) {
			console.log("read name", { data, error });
		},
	});

	const { data: balanceOfData } = useContractRead({
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "balanceOf",
		args: [address],
		//chainId: chain.id || 1,
	});

	if (balanceOfData != undefined) {
		balanceVeToken = ethers.utils.formatEther(balanceOfData);
	}
	//   console.log(`user balance: ${balanceMainToken}\n`);

	//locked
	const { data: locked } = useContractRead({
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "locked",
		args: [address],
		//chainId: chain.id || 1,
	});
	console.log("1111111111111111111111111111");
	console.log(locked);
	const lockedBalance = ethers.utils.formatEther(locked[0]);
	const lockedendTime = ethers.utils.formatEther(locked[1]);
	
	//input date
	const handleSetLockAmount = (ev:any) => {
		let amount = parseInt(ev.target.value, 10);
		if (!amount || amount <= 0) {
			amount = 1;
		}
		
		setAmount(amount);
	};
	function getblockTimeStamp(){
		const { data, isError, isLoading } = useBlockNumber();
		const provider = useProvider();
		const block = provider.getBlock(data).then((block)=>{
			console.log("33333");
			console.log(block.timestamp);
			return block.timestamp;
		});
	};

	const handleSetLockTime = (ev:any) => {
		let dayTime = parseInt(ev.target.value, 10);
		if (!dayTime || dayTime <= 0) {
			dayTime = 1;
		}
		setLockTime(dayTime);
	};

	//fist create lock maintoken
	const { writeAsync:createLock } = useContractWrite({
		mode: "recklesslyUnprepared",
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "createLock",
		args: [amount*10**18,((lockTime*86400)+timeStamp)],
	});

	//increaseUnlockTime
	const { writeAsync:increaseUnlockTime } = useContractWrite({
		mode: "recklesslyUnprepared",
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "increaseUnlockTime",
		args: [((lockTime*86400)+timeStamp)],
	});

	//
	const { writeAsync:increaseAmount } = useContractWrite({
		mode: "recklesslyUnprepared",
		address: VeTokenAddress || ZERO_ADDRESS,
		abi: VotingEscrowABI,
		functionName: "increaseAmount",
		args: [amount*10**18],
	});

	const hanldeMint = () => {
		if(balanceOfData === 0){
			createLock().then(() => {
				alert("✅ Tx sended!");
			});
		}else{
			increaseUnlockTime().then(()=>{
				increaseAmount().then(()=>{
					alert("✅ Tx sended!");
				});
			}
			);
		}
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

	  function valuetext(value: number) {
		setAmount(value);
		const { data, isError, isLoading } = useBlockNumber();
		const provider = useProvider();
		const block = provider.getBlock(data).then((block)=>{
			console.log("33333");
			console.log(block.timestamp);
			settimeStamp(block.timestamp);
		});
		return `${value}`;
	  };
    const card = (
        <React.Fragment>
          <CardContent>
            <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
             VE Token Info
            </Typography>

            <Typography variant="h5" component="div">
			Name{bull}(vetoken name): {vetokenName}
            </Typography>

            <Typography variant="h5" component="div">
			VeSymbol{bull}( vetoken veSymbol): {veSymbol ? veSymbol : "0"}
            </Typography>

			<Typography variant="h5" component="div">
			TotalSupplyAt{bull}(vetoken totalSupplyAt): {totalSupplyAt ? totalSupplyAt : "0"}
            </Typography>

			<Typography variant="h5" component="div">
			Lock Token{bull}(my locked mainToken): {balanceVeToken ? balanceVeToken : "0"}
            </Typography>

			<Typography variant="h5" component="div">
			Amount{bull}(my vetoken amount): {lockedBalance ? lockedBalance : "0"}
            </Typography>

			<Typography variant="h5" component="div">
			EndTime{bull}(my vetoken endTime): {lockedendTime ? lockedendTime : "0"}
            
			</Typography>
			<Typography variant="h5" component="div">
				Amount{bull}(usr amount): {balanceMainToken ? balanceMainToken : "0"}
            </Typography>

           </CardContent>
			 {/*<TextField id="outlined-basic" label="Outlined" variant="outlined" value={amount} onChange={handleSetLockAmount} >
				Lock Amount
			</TextField> */}
		    <Box sx={{ width: 300,textAlign: "center", }}>
			<TextField id="outlined-basic" label="Outlined" variant="outlined" value={lockTime} onChange={handleSetLockTime} >
						Lock Time
					</TextField>
				<Slider
					aria-label="Temperature"
					defaultValue={100}
					getAriaValueText={valuetext}
					valueLabelDisplay="auto"
					step={10}
					min={10}
					max={1000}
				/>
			<Button onClick={hanldeMint} variant="contained" href="#contained-buttons">Mint Token</Button>
	</Box>
		
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

export default VotingEscrow;
