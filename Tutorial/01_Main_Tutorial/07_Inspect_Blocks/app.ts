/*
    => You can see the block contain chain of transaction here: https://etherscan.io/
    => we can see all of the information related to that block inside blockchain network
*/

// so we can fetch these information using ether js
// https://docs.ethers.io/v5/api/providers/provider/#Provider--block-methods

import { ethers } from "ethers";

const INFURA_API = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://mainnet.infura.io/v3/${INFURA_API}`
);

async function main() {
  // first get latest block number
  const latest_block_number = await provider.getBlockNumber();

  console.log("Block number: ", latest_block_number);

  // now get the information about that latest block
  const blockInfo = await provider.getBlock(latest_block_number);
  console.log(blockInfo);

  // to get information about transaction from or with block and we will just extract transactions
  const { transactions } = await provider.getBlockWithTransactions(
    latest_block_number
  );

  // first transaction info on latest block
  console.log(transactions[0]);
}

main();
