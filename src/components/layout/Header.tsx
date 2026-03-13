'use client';

import dynamic from 'next/dynamic';
import { useGameContext } from '@/context/GameContext';
import { useTokenBalance } from '@/hooks/useTokenBalance';
import GameStateBadge from '@/components/common/GameStateBadge';
import TokenAmount from '@/components/common/TokenAmount';
import { Crown } from 'lucide-react';

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false },
);

export default function Header() {
  const { state } = useGameContext();
  const balance = useTokenBalance();

  return (
    <header className="border-b border-royal-purple/30 bg-royal-midnight/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Crown className="text-crown-gold" size={28} />
          <h1 className="font-cinzel text-xl font-bold bg-gradient-to-r from-crown-gold to-crown-ember bg-clip-text text-transparent">
            Hot Crown
          </h1>
        </div>

        {/* Center — Game State */}
        <GameStateBadge phase={state.phase} isBattleActive={state.battle.isBattleActive} />

        {/* Right — Balance + Wallet */}
        <div className="flex items-center gap-4">
          {balance !== null && (
            <TokenAmount amount={balance} className="text-crown-gold-light" />
          )}
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
