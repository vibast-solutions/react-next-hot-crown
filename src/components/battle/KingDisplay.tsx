'use client';

import Image from 'next/image';
import WalletAddress from '@/components/common/WalletAddress';
import { usePunchline } from '@/hooks/usePunchline';
import { PUNCHLINES } from '@/lib/punchlines';

interface KingDisplayProps {
  kingWallet: string;
  isBattleActive: boolean;
}

export default function KingDisplay({ kingWallet, isBattleActive }: KingDisplayProps) {
  const idlePunchline = usePunchline(PUNCHLINES.idleKing);
  const fightPunchline = usePunchline(PUNCHLINES.kingFighting);

  if (!isBattleActive) {
    // Idle — show the full king_resting image so the user sees the crypto references
    return (
      <div className="text-center">
        <div className="relative w-full max-w-xs mx-auto mb-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-crown-gold/20 border-2 border-crown-gold/30">
            <Image
              src="/king_resting.png"
              alt="The King rests on his throne"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <p className="font-cinzel text-xl text-crown-gold-light mb-1">The King</p>
        <WalletAddress address={kingWallet} className="text-base" />
        <p className="font-cinzel text-sm text-crown-gold/80 mt-3">Kingdom at Peace</p>
        <p className="text-sm text-gray-400 mt-1">{idlePunchline}</p>
      </div>
    );
  }

  // Active battle — full image like idle
  return (
    <div className="text-center">
      <div className="relative w-full max-w-xs mx-auto mb-4">
        <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl shadow-crown-flame/20 border-2 border-crown-flame/30">
          <Image
            src="/king_defending.png"
            alt="The King defends his throne"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <p className="font-cinzel text-xl text-crown-flame mb-1">The King Fights</p>
      <WalletAddress address={kingWallet} className="text-base" />
      <p className="text-sm text-gray-400 mt-2">{fightPunchline}</p>
    </div>
  );
}
