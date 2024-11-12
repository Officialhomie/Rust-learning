import { Connection, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import 'dotenv/config';

import {
    getKeypairFromEnvironment,
    airdropIfRequired,
  } from "@solana-developers/helpers";

// Function to get the keypair from the environment variable
const payer = getKeypairFromEnvironment("SECRET_KEY");


async function transferSOL() {
  // Get the sender and receiver keypairs
  const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");

  const receiverPublicKey = new PublicKey('BJkiKiE7SCewBBRimC4nNttHynmqbBuJprqDewBqKqVZ');

  // Connect to the Solana Devnet
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  // Define the amount of SOL to transfer (in lamports)
  const amountToTransfer = 0.1 * 1_000_000_000; // 0.1 SOL

  // Create a new transaction
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: senderKeypair.publicKey,
      toPubkey: receiverPublicKey,
      lamports: amountToTransfer,
    })
  );

  // Send and confirm the transaction
  const signature = await sendAndConfirmTransaction(connection, transaction, [senderKeypair]);

//   console.log(`✅ Transaction successful! Signature: ${signature}`);
  console.log(
    `✅ Transaction successful!, You can view your transaction on Solana Explorer at:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`,
  );
}

transferSOL();