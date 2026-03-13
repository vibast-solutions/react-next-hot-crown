'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useConnection } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { Program, AnchorProvider, Idl } from '@coral-xyz/anchor';
import { GameState } from '@/lib/types';
import { PROGRAM_ID, GAME_STATE_SEED } from '@/lib/constants';
import idl from '@/lib/idl/hot_crown.json';

const DEFAULT_PUBKEY = PublicKey.default.toBase58();

function parseOnChainState(raw: any): GameState {
  const phase = raw.phase.bidding ? 'bidding' : 'battle';
  const candidateWallet = raw.candidate.toBase58();
  const kingWallet = raw.king.toBase58();
  const oneToken = raw.oneToken.toNumber();

  return {
    phase,
    paused: raw.paused,
    bidding: {
      candidateWallet: candidateWallet === DEFAULT_PUBKEY ? null : candidateWallet,
      currentBidAmount: raw.lastBidAmount.toNumber(),
      nextRequiredBid: raw.nextBidAmount.toNumber(),
      thronePot: raw.thronePot.toNumber() / oneToken,
      deadline: raw.biddingDeadline.toNumber() === 0
        ? null
        : raw.biddingDeadline.toNumber() * 1000, // unix seconds → ms
    },
    battle: {
      kingWallet: kingWallet === DEFAULT_PUBKEY ? '' : kingWallet,
      attackArmy: raw.attackSoldiers.toNumber(),
      defenseArmy: raw.defenseSoldiers.toNumber(),
      attackPool: raw.attackPool.toNumber() / oneToken,
      defensePool: raw.defensePool.toNumber() / oneToken,
      deadline: raw.battleDeadline.toNumber() === 0
        ? null
        : raw.battleDeadline.toNumber() * 1000,
      isBattleActive: raw.battleActive,
    },
  };
}

const EMPTY_STATE: GameState = {
  phase: 'bidding',
  paused: false,
  bidding: {
    candidateWallet: null,
    currentBidAmount: 0,
    nextRequiredBid: 1,
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

interface GameContextValue {
  state: GameState;
  refresh: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const { connection } = useConnection();
  const [state, setState] = useState<GameState>(EMPTY_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchState = useCallback(async () => {
    try {
      const provider = new AnchorProvider(connection, {} as any, { commitment: 'confirmed' });
      const program = new Program(idl as Idl, provider);

      const [gameStatePda] = PublicKey.findProgramAddressSync(
        [GAME_STATE_SEED],
        PROGRAM_ID
      );

      const raw = await (program.account as any).gameState.fetch(gameStatePda);
      setState(parseOnChainState(raw));
      setError(null);
    } catch (e: any) {
      console.error('Failed to fetch game state:', e);
      setError(e.message || 'Failed to fetch game state');
    } finally {
      setLoading(false);
    }
  }, [connection]);

  // Initial fetch + polling every 3 seconds
  useEffect(() => {
    fetchState();
    const interval = setInterval(fetchState, 3000);
    return () => clearInterval(interval);
  }, [fetchState]);

  return (
    <GameContext.Provider value={{ state, refresh: fetchState, loading, error }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
}
