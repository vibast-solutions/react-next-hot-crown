'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';

export function useTokenBalance(): number | null {
  const { connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (connected) {
      // Mock balance — will be replaced with real SPL token balance lookup
      setBalance(50_000);
    } else {
      setBalance(null);
    }
  }, [connected]);

  return balance;
}
