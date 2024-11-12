import {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet")); // setting up connection

const address = new PublicKey("CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN"); //fetching the address

const balance = await connection.getBalance(address); // getting the balance

const balanceInSol = balance / LAMPORTS_PER_SOL; // solana equivalent

console.log(`The balance of the account at ${address} is ${balanceInSol} SOL`);
console.log(`✅ Finished!`);