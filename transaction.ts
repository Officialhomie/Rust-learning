// Importing necessary functions and modules from the @solana/web3.js library
// This includes functions for handling Solana connections, transactions, and system programs
import {
    Connection,
    Transaction,
    SystemProgram,
    sendAndConfirmTransaction,
    PublicKey,
} from "@solana/web3.js";

// Importing the dotenv library to access environment variables
import "dotenv/config";

// Importing a helper function to get a Solana keypair from an environment variable
import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// Retrieving the destination public key from the command-line arguments
const suppliedToPubkey = process.argv[2] || null;

// Checking if a destination public key was provided
if(!suppliedToPubkey) {
    // If not, logging an error message and exiting the process
    console.log("Please provide an address to sent to!");
    process.exit(1);
}

// Retrieving the sender's keypair from an environment variable using the helper function
const senderKeypair = getKeypairFromEnvironment('SECRET_KEY');

// Logging the destination public key
console.log(`suppliedToPubkey: ${suppliedToPubkey}`);

// Creating a new PublicKey object from the destination public key string
const toPubkey = new PublicKey(suppliedToPubkey);

// Establishing a connection to the Solana Devnet
const connection = new Connection("https://api.devnet.solana.com", "confirmed");

// Logging a success message
console.log(
    `✅ Loaded our own keypair, the destination public key, and connected to Solana`,
);

// Creating a new Transaction object
const transaction = new Transaction();

// Defining the amount of SOL (in lamports) to send
const LAMPORTS_TO_SEND = 1000000;

// Creating a SystemProgram.transfer instruction to send SOL
// The instruction specifies the sender's public key, the recipient's public key, and the amount in lamports
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});

// Adding the transfer instruction to the transaction
transaction.add(sendSolInstruction);

// Sending and confirming the transaction, passing in the connection, the transaction, and the sender's keypair
const signature = await sendAndConfirmTransaction(connection, transaction, [
  senderKeypair,
]);

// Logging a success message with the amount sent and the transaction signature
console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `,
);
console.log(`Transaction signature is ${signature}!`);