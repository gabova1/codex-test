import { Connection, PublicKey } from '@solana/web3.js';

export const getRpcEndpoint = () =>
  process.env.NEXT_PUBLIC_SOLANA_RPC_URL || process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

export const getConnection = () => new Connection(getRpcEndpoint(), 'confirmed');

export const solanaPublicKeyFromProvider = (providerResponse) => {
  if (!providerResponse) return null;
  if (providerResponse.publicKey instanceof PublicKey) return providerResponse.publicKey;
  if (typeof providerResponse.publicKey === 'string') return new PublicKey(providerResponse.publicKey);
  if (providerResponse.publicKey?.toBase58) return providerResponse.publicKey;
  return null;
};

export const fetchWalletSummary = async (address) => {
  const connection = getConnection();
  const pubkey = new PublicKey(address);
  const [balance, confirmedSignatures] = await Promise.all([
    connection.getBalance(pubkey),
    connection.getSignaturesForAddress(pubkey, { limit: 20 })
  ]);
  return {
    address,
    balance: balance / 1e9,
    transactions: confirmedSignatures
  };
};
