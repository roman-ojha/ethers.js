import { ethers } from "ethers";

const INFURA_API = process.env.INFURA_API_KEY;

// because we don't have any ETH on main network we will use ropsten network to do a transaction
const provider = new ethers.providers.JsonRpcBatchProvider(
  `https://ropsten.infura.io/v3/${INFURA_API}`
);

// we need the address of sender and receiver and we will use metamask account
const sender_account = process.env
  .METAMASK_ROPSTEN_SENDER_ACCOUNT_ADDRESS as string;
const receiver_account = process.env
  .METAMASK_ROPSTEN_RECEIVER_ACCOUNT_ADDRESS as string;

// as well as we need private key of the account to access/control/authenticate to wallet
const sender_private_key = process.env
  .METAMASK_ROPSTEN_SENDER_ACCOUNT_PRIVATE_KEY as string;
const receiver_private_key = process.env
  .METAMASK_ROPSTEN_RECEIVER_ACCOUNT_PRIVATE_KEY as string;

// Creating new wallet Instance
const sender_wallet = new ethers.Wallet(sender_private_key, provider);
const receiver_wallet = new ethers.Wallet(receiver_private_key, provider);
// now using this wallet we can do transaction

async function main() {
  // now we can send the transaction through wallet
  // sender_account balance before transfer
  console.log("Before Transaction: ");
  console.log(
    "Sender Balance: ",
    ethers.utils.formatEther(await sender_wallet.getBalance())
  );
  console.log(
    "Sender Balance: ",
    ethers.utils.formatEther(await provider.getBalance(sender_account))
  );
  // receiver balance before transfer
  console.log(
    "Receiver Balance: ",
    ethers.utils.formatEther(await receiver_wallet.getBalance())
  );
  console.log(
    "Receiver Balance: ",
    ethers.utils.formatEther(await provider.getBalance(receiver_account))
  );

  // Send Ether
  const tx = await sender_wallet.sendTransaction({
    // to is the address of account where you want to send transaction
    to: receiver_account,
    // value to transfer
    value: ethers.utils.parseEther("0.00003"),
  });
  console.log(tx);

  // sender_account balance after transfer
  console.log("After Transaction: ");
  console.log(
    "Sender Balance: ",
    ethers.utils.formatEther(await sender_wallet.getBalance())
  );
  console.log(
    "Sender Balance: ",
    ethers.utils.formatEther(await provider.getBalance(sender_account))
  );
  // receiver balance after transfer
  console.log(
    "Receiver Balance: ",
    ethers.utils.formatEther(await receiver_wallet.getBalance())
  );
  console.log(
    "Receiver Balance: ",
    ethers.utils.formatEther(await provider.getBalance(receiver_account))
  );
}

main();
