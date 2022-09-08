/*
    => here we will see:
        -> how to import ether into project
        -> how to connect to the blockchain 
        -> how to fetch the information
*/

import { ethers } from "ethers";

// now we will try to access ethereum node blockchain smart contract
// we will use somebody ethereum node
// for that we will use infura
// so create a project and copy the api key
const INFURA_API = process.env.INFURA_API_KEY;
/*
  *) JsonRpc:
  -> it is a way to interact with ethereum node
  -> https://docs.ethers.io/v5/api/providers/jsonrpc-provider/
  */
// so now we have to setup a connection with JsonRpc
const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://mainnet.infura.io/v3/${INFURA_API}`
);
// now you have connection to your blockchain

async function main() {
  // Fetch account balance
  // https://docs.ethers.io/v5/api/providers/provider/#Provider--account-methods
  // copy account address you can copy metamask account address or address from blockchain mainnet
  //  -> https://etherscan.io/
  const temp_address = "0x9E98b829556C2a537d0251DBBfF388ff0b25BC07";
  const balance = await provider.getBalance(temp_address);
  console.log(
    `\nETH Balance of ${temp_address} is ${ethers.utils.formatEther(
      balance
    )} ETH\n`
  );
}

main();
