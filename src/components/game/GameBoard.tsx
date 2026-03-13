'use client';

import { useGameContext } from '@/context/GameContext';
import BiddingView from '@/components/bidding/BiddingView';
import BattleView from '@/components/battle/BattleView';

export default function GameBoard() {
  const { state } = useGameContext();

  return (
    <div className="py-8 px-4">
      {state.phase === 'bidding' ? <BiddingView /> : <BattleView />}
    </div>
  );
}
