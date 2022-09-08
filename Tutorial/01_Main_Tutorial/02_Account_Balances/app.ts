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
