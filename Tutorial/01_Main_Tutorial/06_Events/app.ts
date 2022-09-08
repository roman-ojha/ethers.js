/*
*) Events
    -> For: https://etherscan.io/token/0x6b175474e89094c44da98b954eedeac495271d0f#code
    ->  https://etherscan.io/tx/0x60e3af9f289b4d8c23bcc7408b9438a35b1a2ff8bcd5c9be327c9896b95fdc72#eventlog
    -> here you can see on the transaction log we can see the event logs
    -> So any time you call a smart contract function it has the ability to create an event
    => so if you will look into ERC-20 Token standards:
        -> https://ethereum.org/en/developers/docs/standards/tokens/erc-20/#events
        -> they have function like 'transfer'
        -> but erc-20 also specify that smart contract must emit a transfer event
            -> so,it means that the smart contract on blockchain emit and event and broadcast to any body that this 'transfer' function happen
            -> so, it means that then the transfer function get call and when it finished transfer we can list to the event and when it get finished it will broadcast that finished event and we get notify that transfer get finished
*/

import { ethers } from "ethers";

const INFURA_API = process.env.INFURA_API_KEY;
const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://mainnet.infura.io/v3/${INFURA_API}`
);

// so we will use Dai stablecoin Smart contract for this demonstration
const contract_address = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",

  // also we will put event 'Transfer' as that we can access this event
  "event Transfer(address indexed from, address indexed to, uint amount)",
];
const contract = new ethers.Contract(contract_address, ERC20_ABI, provider);

async function main() {
  // you can get the latest block number
  const latest_block_number = await provider.getBlockNumber();
  //  https://docs.ethers.io/v5/api/contract/contract/#Contract--events
  const transferEvents = await contract.queryFilter(
    //   just by access every event of this contract that is a lot of event that happen in this contract so we will going to filter that event by specifying the block number from that contract
    // queryFilter("<event_name>",<from_block>,<to_block>)
    "Transfer",
    // 15496258, // from_block
    latest_block_number - 10,
    // 15496269 // to_block
    latest_block_number
  );
  console.log(transferEvents);
}

main();
