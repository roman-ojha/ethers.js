// here we will learn how to interact with smart contract on the blockchain

// for that we will use a real life smart contract 'Dia Stablecoin' it is a ERC-20 Token which is on the main ethereum network
// https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f

// we are try to read contract so we will go to this:
// https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#readContract

import { ethers } from "ethers";

const INFURA_API = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://mainnet.infura.io/v3/${INFURA_API}`
);

// in order to interact with smart contract we have to setup a new contract object with ether
// https://docs.ethers.io/v5/api/contract/contract/

// to interact with Smart contract we need:
// 1. Contract address
// 2. ABI of smart contract (Abstract Binary Interface)
// 3. SignerOrProvider

const contract_address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

// you can copy the how abi available for the smart contract but that will be big chunk of ABI
// rather what we can do is in ethers.js is that ethers let's you store ABI as an array and only pull in the parts that you want to whenever you are setting up a smart contract object
const ERC20_ABI = [
  // so we can put the function that this contract have like this
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

// Creating Instance of contract
const contract = new ethers.Contract(contract_address, ERC20_ABI, provider);

async function main() {
  // now we can interact with contract functions
  const name = await contract.name();
  const symbol = await contract.symbol();
  console.log(symbol);
  const totalSupply = await contract.totalSupply();
  console.log(`Reading from ${contract_address}`);
  console.log("name of contract: ", name);
  console.log(`Symbol: ${symbol}`);
  console.log(`Total Supply: ${totalSupply}`);

  //   calling contract which have argument
  const temp_address = "0x6c6Bc977E13Df9b0de53b251522280BB72383700";
  const balance = await contract.balanceOf(temp_address);
  console.log(
    "Balance of ",
    temp_address,
    " is: ",
    ethers.utils.formatEther(balance)
  );
}

main();
