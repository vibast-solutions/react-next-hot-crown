'use client';

import dynamic from 'next/dynamic';
import { GameProvider } from '@/context/GameContext';
import Header from '@/components/layout/Header';
import GameBoard from '@/components/game/GameBoard';
import DevToolbar from '@/components/game/DevToolbar';
import HowItWorks from '@/components/common/HowItWorks';

const WalletProvider = dynamic(
  () => import('@/components/wallet/WalletProvider'),
  { ssr: false },
);

export default function Home() {
  return (
    <WalletProvider>
      <GameProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <GameBoard />
          </main>
          <HowItWorks />
          <DevToolbar />
        </div>
      </GameProvider>
    </WalletProvider>
  );
}
