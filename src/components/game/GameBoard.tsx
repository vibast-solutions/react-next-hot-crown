'use client';

import { useGameContext } from '@/context/GameContext';
import BiddingView from '@/components/bidding/BiddingView';
import BattleView from '@/components/battle/BattleView';

export default function GameBoard() {
  const { state, loading, error } = useGameContext();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 font-cinzel">Loading realm state...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-sm">Failed to load game state. Retrying...</p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      {state.phase === 'bidding' ? <BiddingView /> : <BattleView />}
    </div>
  );
}
