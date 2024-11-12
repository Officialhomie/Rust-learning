


import { 
    Connection, 
    LAMPORTS_PER_SOL, 
    PublicKey 
} from "@solana/web3.js";
import { resolve } from "@bonfida/spl-name-service";

// Initialize the connection to Solana Mainnet
const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");

// Function to get the balance of a wallet address or Solana domain
async function getBalance(addressOrDomain) {
    try {
        // Resolve .sol domain to public key if necessary
        let publicKey;
        if (addressOrDomain.endsWith(".sol")) {
            console.log(`Resolving domain: ${addressOrDomain}`);
            publicKey = await resolveDomainToPublicKey(addressOrDomain);
            console.log(`Resolved domain ${addressOrDomain} to public key: ${publicKey}`);
        } else {
            publicKey = new PublicKey(addressOrDomain);
        }

        // Fetch balance in lamports
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

        console.log(
            `💰 Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL} SOL!`
        );
    } catch (error) {
        console.error("❌ Error: Invalid address or domain. Please enter a valid wallet address or .sol domain.");
    }
}

// Helper function to resolve .sol domain to PublicKey
async function resolveDomainToPublicKey(domain) {
    const resolvedPublicKey = await resolve(connection, domain);
    if (!resolvedPublicKey) {
        throw new Error(`Could not resolve domain: ${domain}`);
    }
    return resolvedPublicKey;
}

// Example usage
await getBalance("toly.sol"); // Example with .sol domain
await getBalance("59APKosXzS6n9x8heKFLd4nBWCfZLv8i5eAVu95fWFxq"); // Example with public key
