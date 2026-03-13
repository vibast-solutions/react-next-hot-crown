'use client';

import { useWallet } from '@solana/wallet-adapter-react';

interface WalletAddressProps {
  address: string;
  className?: string;
}

export default function WalletAddress({ address, className = '' }: WalletAddressProps) {
  const { publicKey } = useWallet();

  if (!address) return <span className="text-gray-500 italic">None</span>;

  const isYou = publicKey?.toBase58() === address;
  const short = `${address.slice(0, 4)}...${address.slice(-4)}`;

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className="font-mono text-sm bg-royal-purple/50 px-2 py-0.5 rounded"
        title={address}
      >
        {short}
      </span>
      {isYou && (
        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-crown-gold/20 text-crown-gold-light border border-crown-gold/30">
          You
        </span>
      )}
    </span>
  );
}
