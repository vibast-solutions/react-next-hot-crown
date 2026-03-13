'use client';

import Image from 'next/image';
import WalletAddress from '@/components/common/WalletAddress';
import TokenAmount from '@/components/common/TokenAmount';
import { usePunchline } from '@/hooks/usePunchline';
import { PUNCHLINES } from '@/lib/punchlines';

interface CandidateDisplayProps {
  candidateWallet: string | null;
  currentBidAmount: number;
}

export default function CandidateDisplay({ candidateWallet, currentBidAmount }: CandidateDisplayProps) {
  const emptyPunchline = usePunchline(PUNCHLINES.emptyThrone);
  const candidatePunchline = usePunchline(PUNCHLINES.candidateBidding);

  return (
    <div className="text-center">
      {/* Throne Image */}
      <div className="relative w-full max-w-xs mx-auto mb-6">
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-crown-gold/20">
          <Image
            src="/empty_throne.png"
            alt="The Throne"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-transparent to-transparent" />
        </div>
      </div>

      {/* Candidate Info */}
      {!candidateWallet ? (
        <div>
          <p className="font-cinzel text-2xl text-crown-gold-light">The Throne Awaits</p>
          <p className="text-sm text-gray-400 mt-2">{emptyPunchline}</p>
        </div>
      ) : (
        <div>
          <p className="font-cinzel text-lg text-crown-gold-light mb-1">A Pretender Approaches</p>
          <p className="text-sm text-gray-400 mb-3">{candidatePunchline}</p>
          <WalletAddress address={candidateWallet} className="text-base" />
          <div className="mt-3">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Current Bid</p>
            <TokenAmount amount={currentBidAmount} className="text-2xl text-crown-gold-light" />
          </div>
        </div>
      )}
    </div>
  );
}
