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

  if (state.paused) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="text-4xl mb-4">&#x2694;&#xFE0F;</div>
        <h2 className="text-2xl font-cinzel text-amber-400 mb-2">The Realm Sleeps</h2>
        <p className="text-gray-400 max-w-md">
          The gates of the kingdom are sealed. The throne awaits, but the realm is not yet ready for battle. Return soon, brave soul.
        </p>
      </div>
    );
  }

  return (
    <div className="py-8 px-4">
      {state.phase === 'bidding' ? <BiddingView /> : <BattleView />}
    </div>
  );
}
