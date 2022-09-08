// here we will learn to send cryptocurrency token around
// we will go here and copy the token address:
// Goerli Token address: 0x01BE23585060835E02B77ef475b0Cc51aA1e0709
//  now we will import token into metamask and add it
// after that we will try to request link from here: https://faucets.chain.link/goerli
//  after that we will get the token LINK
// transaction that happen while learning this: https://goerli.etherscan.io/tx/0xb163f2803a1066990548552aff9cff85cb58788dc8a197471d07587fb2d179a4

// and also that ERC-20 Token have contract write function as well:
// https://goerli.etherscan.io/token/0x326c977e6efc84e512bb9c30f76e30c160ed06fb#writeContract
// now we will going to use that ERC-20 Token Transfer function to send tokens from the account to another account

import { ethers } from "ethers";

const INFURA_API = process.env.INFURA_API_KEY;

const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://goerli.infura.io/v3/${INFURA_API}`
);

const sender_account = process.env.METAMASK_SENDER_ACCOUNT_ADDRESS as string;
const receiver_account = process.env
  .METAMASK_RECEIVER_ACCOUNT_ADDRESS as string;

const sender_private_key = process.env
  .METAMASK_SENDER_ACCOUNT_PRIVATE_KEY as string;
const receiver_private_key = process.env
  .METAMASK_RECEIVER_ACCOUNT_PRIVATE_KEY as string;

const sender_wallet = new ethers.Wallet(sender_private_key, provider);
const receiver_wallet = new ethers.Wallet(receiver_private_key, provider);

// Create New instal of Contract
const contract_address = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB";
const ERC20_ABI = [
  // check token balance, Read contract function
  "function balanceOf(address) view returns (uint)",
  //   function to transfer Token from one account to another account
  "function transfer(address to, uint amount) returns (bool)",
];
const contract = new ethers.Contract(contract_address, ERC20_ABI, provider);

async function main() {
  const balance = await contract.balanceOf(sender_account);
  console.log(`Reading from: ${sender_account}`);
  console.log(`Balance of sender: ${balance}`);
  // so we want to call the 'transfer' function
  //   but we can't call it through contract directly
  // we need to connect contract with wallet
  const contractWithWallet = contract.connect(sender_wallet);
  //   now we can call the contract function with 'contractWithWallet'
  const tx = await contractWithWallet.transfer(receiver_account, balance);
  //   we have to wait() to be mined the transaction
  //   so here we will transfer all the token from sender account to receiver account
  await tx.wait();
  console.log(tx);
  const balanceOfSender = await contract.balanceOf(sender_account);
  const balanceOfReceiver = await contract.balanceOf(receiver_account);
  console.log(`Balance of sender: ${balanceOfSender}`);
  console.log(`Balance of receiver: ${balanceOfReceiver}`);
}

main();
