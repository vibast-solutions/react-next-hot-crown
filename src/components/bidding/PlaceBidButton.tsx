'use client';

import { useWallet } from '@solana/wallet-adapter-react';
import { useGameContext } from '@/context/GameContext';
import TokenAmount from '@/components/common/TokenAmount';

interface PlaceBidButtonProps {
  nextRequiredBid: number;
  isExpired: boolean;
}

export default function PlaceBidButton({ nextRequiredBid, isExpired }: PlaceBidButtonProps) {
  const { connected, publicKey } = useWallet();
  const { dispatch } = useGameContext();

  const handleBid = () => {
    if (!publicKey) return;
    dispatch({ type: 'PLACE_BID', wallet: publicKey.toBase58() });
  };

  if (isExpired) {
    return null;
  }

  return (
    <button
      onClick={handleBid}
      disabled={!connected}
      className={`w-full py-4 rounded-xl font-cinzel text-lg font-bold transition-all ${
        connected
          ? 'bg-gradient-to-r from-crown-gold to-crown-ember hover:from-crown-gold-light hover:to-crown-flame text-royal-midnight shadow-lg shadow-crown-gold/20 hover:shadow-crown-gold/40'
          : 'bg-gray-700 text-gray-400 cursor-not-allowed'
      }`}
    >
      {connected ? (
        <>
          Place Bid: <TokenAmount amount={nextRequiredBid} showLabel={false} />
          <span className="text-sm font-normal ml-1">HCRN</span>
        </>
      ) : (
        'Connect Wallet to Bid'
      )}
    </button>
  );
}
