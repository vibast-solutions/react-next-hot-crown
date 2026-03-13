'use client';

import dynamic from 'next/dynamic';
import { GameProvider } from '@/context/GameContext';
import Header from '@/components/layout/Header';
import GameBoard from '@/components/game/GameBoard';
import HowItWorks from '@/components/common/HowItWorks';
import ComingSoon from '@/components/common/ComingSoon';

const WalletProvider = dynamic(
  () => import('@/components/wallet/WalletProvider'),
  { ssr: false },
);

const isComingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

export default function Home() {
  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <WalletProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <GameBoard />
          </main>
          <HowItWorks />
        </div>
      </GameProvider>
    </WalletProvider>
  );
}
