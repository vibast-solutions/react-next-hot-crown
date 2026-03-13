'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { GameState, GameAction } from '@/lib/types';
import { GAME_CONSTANTS } from '@/lib/constants';
import { MOCK_STATES } from '@/lib/mockData';

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PLACE_BID': {
      const { bidding } = state;
      const newBidAmount = bidding.nextRequiredBid;
      const newPot = bidding.thronePot + newBidAmount;
      const nextBid = Math.ceil(newBidAmount * (1 + GAME_CONSTANTS.BID_INCREMENT_PERCENT / 100));

      return {
        ...state,
        bidding: {
          candidateWallet: action.wallet,
          currentBidAmount: newBidAmount,
          nextRequiredBid: nextBid,
          thronePot: newPot,
          deadline: Date.now() + GAME_CONSTANTS.BIDDING_TIMER_MS,
        },
      };
    }

    case 'SETTLE_BIDDING': {
      if (!state.bidding.candidateWallet) return state;
      return {
        ...state,
        phase: 'battle',
        bidding: {
          candidateWallet: null,
          currentBidAmount: 0,
          nextRequiredBid: GAME_CONSTANTS.INITIAL_BID,
          thronePot: 0,
          deadline: null,
        },
        battle: {
          kingWallet: state.bidding.candidateWallet,
          attackArmy: 0,
          defenseArmy: 0,
          attackPool: 0,
          defensePool: 0,
          deadline: null,
          isBattleActive: false,
        },
      };
    }

    case 'ATTACK': {
      const { soldiers } = action;
      const tokenCost = soldiers * GAME_CONSTANTS.TOKENS_PER_SOLDIER;
      const afterFee = tokenCost * (1 - GAME_CONSTANTS.DEV_FEE_PERCENT / 100);
      const newAttackArmy = state.battle.attackArmy + soldiers;
      const newAttackPool = state.battle.attackPool + afterFee;
      const isBattleStarting = !state.battle.isBattleActive;

      return {
        ...state,
        battle: {
          ...state.battle,
          attackArmy: newAttackArmy,
          attackPool: newAttackPool,
          isBattleActive: true,
          deadline: isBattleStarting
            ? Date.now() + GAME_CONSTANTS.BATTLE_TIMER_MS
            : state.battle.deadline,
        },
      };
    }

    case 'DEFEND': {
      const { soldiers } = action;
      const tokenCost = soldiers * GAME_CONSTANTS.TOKENS_PER_SOLDIER;
      const afterFee = tokenCost * (1 - GAME_CONSTANTS.DEV_FEE_PERCENT / 100);
      const newDefenseArmy = state.battle.defenseArmy + soldiers;
      const newDefensePool = state.battle.defensePool + afterFee;
      const isBattleStarting = !state.battle.isBattleActive;

      return {
        ...state,
        battle: {
          ...state.battle,
          defenseArmy: newDefenseArmy,
          defensePool: newDefensePool,
          isBattleActive: true,
          deadline: isBattleStarting
            ? Date.now() + GAME_CONSTANTS.BATTLE_TIMER_MS
            : state.battle.deadline,
        },
      };
    }

    case 'SETTLE_BATTLE': {
      const { battle } = state;
      const attackWins = battle.attackArmy > battle.defenseArmy;

      // Reset to bidding after battle settlement
      if (attackWins) {
        return {
          ...state,
          phase: 'bidding',
          bidding: {
            candidateWallet: null,
            currentBidAmount: 0,
            nextRequiredBid: GAME_CONSTANTS.INITIAL_BID,
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
        };
      } else {
        // Defense wins (or tie) — king stays, battle resets
        return {
          ...state,
          battle: {
            ...state.battle,
            attackArmy: 0,
            defenseArmy: 0,
            attackPool: 0,
            defensePool: 0,
            deadline: null,
            isBattleActive: false,
          },
        };
      }
    }

    case 'SET_STATE':
      return action.state;

    case 'TICK':
      return state;

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  loadPreset: (key: string) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, MOCK_STATES.freshBidding);

  const loadPreset = useCallback((key: string) => {
    const preset = MOCK_STATES[key];
    if (preset) {
      // Refresh deadlines relative to now
      const refreshed = JSON.parse(JSON.stringify(preset)) as GameState;
      if (refreshed.bidding.deadline) {
        refreshed.bidding.deadline = Date.now() + 3 * 60 * 1000;
      }
      if (refreshed.battle.deadline) {
        refreshed.battle.deadline = Date.now() + 7 * 60 * 1000;
      }
      dispatch({ type: 'SET_STATE', state: refreshed });
    }
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, loadPreset }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
}
