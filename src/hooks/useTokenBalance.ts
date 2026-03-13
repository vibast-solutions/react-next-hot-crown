'use client';

import { useState, useEffect } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { TOKEN_MINT, GAME_CONSTANTS } from '@/lib/constants';

export function useTokenBalance(): number | null {
  const { connection } = useConnection();
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(null);
      return;
    }

    let cancelled = false;

    const fetchBalance = async () => {
      try {
        const ata = await getAssociatedTokenAddress(TOKEN_MINT, publicKey);
        const account = await getAccount(connection, ata);
        if (!cancelled) {
          setBalance(Number(account.amount) / GAME_CONSTANTS.ONE_TOKEN);
        }
      } catch {
        // Token account doesn't exist yet
        if (!cancelled) setBalance(0);
      }
    };

    fetchBalance();
    const interval = setInterval(fetchBalance, 5000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [connection, publicKey, connected]);

  return balance;
}
