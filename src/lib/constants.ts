export const GAME_CONSTANTS = {
  INITIAL_BID: 1000,
  BID_INCREMENT_PERCENT: 10,
  BIDDING_TIMER_MS: 5 * 60 * 1000, // 5 minutes
  BATTLE_TIMER_MS: 10 * 60 * 1000, // 10 minutes
  TOKEN_DECIMALS: 6,
  TOKENS_PER_SOLDIER: 1,
  DEV_FEE_PERCENT: 5,
  MIN_SOLDIERS: 1,
  MAX_SOLDIERS: 10,
} as const;

export const SOLANA_NETWORK = 'devnet';
export const SOLANA_RPC_URL = 'https://api.devnet.solana.com';
