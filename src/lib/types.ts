export type GamePhase = 'bidding' | 'battle';

export interface BiddingState {
  candidateWallet: string | null;
  currentBidAmount: number;   // whole tokens
  nextRequiredBid: number;    // whole tokens
  thronePot: number;          // whole tokens
  deadline: number | null;    // unix ms
}

export interface BattleState {
  kingWallet: string;
  attackArmy: number;         // whole soldier count
  defenseArmy: number;        // whole soldier count
  attackPool: number;         // tokens after dev fee
  defensePool: number;        // tokens after dev fee
  deadline: number | null;    // unix ms
  isBattleActive: boolean;
}

export interface GameState {
  phase: GamePhase;
  paused: boolean;
  bidding: BiddingState;
  battle: BattleState;
}

export type GameAction =
  | { type: 'PLACE_BID'; wallet: string }
  | { type: 'ATTACK'; soldiers: number; wallet: string }
  | { type: 'DEFEND'; soldiers: number; wallet: string }
  | { type: 'SETTLE_BIDDING' }
  | { type: 'SETTLE_BATTLE' }
  | { type: 'SET_STATE'; state: GameState }
  | { type: 'TICK' };
