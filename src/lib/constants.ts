import { PublicKey } from '@solana/web3.js';

export const GAME_CONSTANTS = {
  INITIAL_BID: 1,
  BIDDING_TIMER_MS: 180 * 1000, // 3 minutes
  BATTLE_TIMER_MS: 180 * 1000,  // 3 minutes
  TOKEN_DECIMALS: 6,
  ONE_TOKEN: 1_000_000,
  TOKENS_PER_SOLDIER: 1,
  DEV_FEE_PERCENT: 10,
  MIN_SOLDIERS: 1,
  MAX_SOLDIERS: 10,
} as const;

export const PROGRAM_ID = new PublicKey(
  process.env.NEXT_PUBLIC_PROGRAM_ID || 'DwtDoUcKTCfkw2hSLwkYf6HVNFmtoMk7VYBjAJek5ixb'
);

export const TOKEN_MINT = new PublicKey(
  process.env.NEXT_PUBLIC_TOKEN_MINT || '3JPJhu1LJZnyXniSVLkrJqYBrqzhw5oxo8TZtJg8pump'
);

export const DEV_WALLET_ATA = new PublicKey(
  process.env.NEXT_PUBLIC_DEV_WALLET_ATA || 'CnW61obKZSaNi3dY6sxqwpzgJLxCd7SxrScH6xPERBE7'
);

export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || 'https://api.devnet.solana.com';

export const GAME_STATE_SEED = Buffer.from('game_state');
