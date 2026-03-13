'use client';

import { useGameContext } from '@/context/GameContext';
import { useCountdown } from '@/hooks/useCountdown';
import Timer from '@/components/common/Timer';
import CandidateDisplay from './CandidateDisplay';
import ThronePot from './ThronePot';
import PlaceBidButton from './PlaceBidButton';

export default function BiddingView() {
  const { state, dispatch } = useGameContext();
  const { bidding } = state;
  const { isExpired } = useCountdown(bidding.deadline);

  const handleSettle = () => {
    dispatch({ type: 'SETTLE_BIDDING' });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Timer */}
      <div className="flex justify-center">
        <Timer deadline={bidding.deadline} label="Bidding ends in" />
      </div>

      {/* Crown + Candidate */}
      <div className="bg-royal-midnight-light/50 border border-royal-purple/20 rounded-2xl p-6">
        <CandidateDisplay
          candidateWallet={bidding.candidateWallet}
          currentBidAmount={bidding.currentBidAmount}
        />
      </div>

      {/* Throne Pot */}
      <ThronePot amount={bidding.thronePot} />

      {/* Bid or Settle */}
      {isExpired && bidding.candidateWallet ? (
        <button
          onClick={handleSettle}
          className="w-full py-4 rounded-xl font-cinzel text-lg font-bold bg-gradient-to-r from-crown-ember to-crown-flame text-white shadow-lg shadow-crown-ember/30 hover:shadow-crown-flame/40 transition-all"
        >
          Settle — Crown the King
        </button>
      ) : (
        <PlaceBidButton nextRequiredBid={bidding.nextRequiredBid} isExpired={isExpired} />
      )}
    </div>
  );
}
