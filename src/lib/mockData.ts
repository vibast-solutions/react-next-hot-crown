import { GameState } from './types';

const MOCK_KING_WALLET = '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU';
const MOCK_CANDIDATE_WALLET = '5FHwkrdxMpMr5N3FBqrpzw8YvFKR1YnUoELheRjqMEDK';

export const MOCK_STATES: Record<string, GameState> = {
  freshBidding: {
    phase: 'bidding',
    bidding: {
      candidateWallet: null,
      currentBidAmount: 0,
      nextRequiredBid: 1000,
      thronePot: 0,
      deadline: null,
    },
    battle: {
      kingWallet: '',
      attackArmy: 0,
      defenseArmy: 0,
      attackPool: 0,
      defensePool: 0,
      deadline: null,
      isBattleActive: false,
    },
  },

  activeBidding: {
    phase: 'bidding',
    bidding: {
      candidateWallet: MOCK_CANDIDATE_WALLET,
      currentBidAmount: 1100,
      nextRequiredBid: 1210,
      thronePot: 2100,
      deadline: Date.now() + 3 * 60 * 1000, // 3 min left
    },
    battle: {
      kingWallet: '',
      attackArmy: 0,
      defenseArmy: 0,
      attackPool: 0,
      defensePool: 0,
      deadline: null,
      isBattleActive: false,
    },
  },

  idleBattle: {
    phase: 'battle',
    bidding: {
      candidateWallet: null,
      currentBidAmount: 0,
      nextRequiredBid: 1000,
      thronePot: 0,
      deadline: null,
    },
    battle: {
      kingWallet: MOCK_KING_WALLET,
      attackArmy: 0,
      defenseArmy: 0,
      attackPool: 0,
      defensePool: 0,
      deadline: null,
      isBattleActive: false,
    },
  },

  attackLeadingBattle: {
    phase: 'battle',
    bidding: {
      candidateWallet: null,
      currentBidAmount: 0,
      nextRequiredBid: 1000,
      thronePot: 0,
      deadline: null,
    },
    battle: {
      kingWallet: MOCK_KING_WALLET,
      attackArmy: 25,
      defenseArmy: 12,
      attackPool: 23.75,
      defensePool: 11.4,
      deadline: Date.now() + 7 * 60 * 1000,
      isBattleActive: true,
    },
  },

  tiedBattle: {
    phase: 'battle',
    bidding: {
      candidateWallet: null,
      currentBidAmount: 0,
      nextRequiredBid: 1000,
      thronePot: 0,
      deadline: null,
    },
    battle: {
      kingWallet: MOCK_KING_WALLET,
      attackArmy: 15,
      defenseArmy: 15,
      attackPool: 14.25,
      defensePool: 14.25,
      deadline: Date.now() + 2 * 60 * 1000,
      isBattleActive: true,
    },
  },
};

export const MOCK_STATE_KEYS = Object.keys(MOCK_STATES) as (keyof typeof MOCK_STATES)[];
