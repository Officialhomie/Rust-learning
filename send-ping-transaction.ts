// Importing the entire web3.js library and all its modules
import * as web3 from "@solana/web3.js";

// Importing the dotenv library to access environment variables
import "dotenv/config";

// Importing helper functions from the @solana-developers/helpers library
import {
  getKeypairFromEnvironment,
  airdropIfRequired,
} from "@solana-developers/helpers";

// Retrieving the payer's keypair from the environment variable 'SECRET_KEY'
const payer = getKeypairFromEnvironment("SECRET_KEY");

// Establishing a connection to the Solana Devnet
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

// Checking if the payer's account requires an airdrop to meet the minimum balance
// and performing the airdrop if necessary
const newBalance = await airdropIfRequired(
  connection,
  payer.publicKey,
  1 * web3.LAMPORTS_PER_SOL,
  0.5 * web3.LAMPORTS_PER_SOL,
);

// Defining the address of the "Ping" program on the Solana blockchain
const PING_PROGRAM_ADDRESS = new web3.PublicKey(
  "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa"
);

// Defining the address of the "Ping" program data account on the Solana blockchain
const PING_PROGRAM_DATA_ADDRESS = new web3.PublicKey(
  "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod"
);

// Creating a new Transaction object
const transaction = new web3.Transaction();

// Creating a PublicKey object for the Ping program address
const programId = new web3.PublicKey(PING_PROGRAM_ADDRESS);

// Creating a PublicKey object for the Ping program data address
const pingProgramDataId = new web3.PublicKey(PING_PROGRAM_DATA_ADDRESS);

// Creating a new TransactionInstruction object
// This instruction will interact with the Ping program
const instruction = new web3.TransactionInstruction({
  keys: [
    {
      pubkey: pingProgramDataId,
      isSigner: false,
      isWritable: true,
    },
  ],
  programId,
});

// Adding the instruction to the transaction
transaction.add(instruction);

// Sending and confirming the transaction, passing in the connection, the transaction, and the payer's keypair
const signature = await web3.sendAndConfirmTransaction(
  connection,
  transaction,
  [payer]
);

// Logging a success message with the transaction signature
console.log(`✅ Transaction completed! Signature is ${signature}`);