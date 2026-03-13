'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useGameActions } from '@/hooks/useGameActions';
import { GAME_CONSTANTS } from '@/lib/constants';
import { Shield } from 'lucide-react';
import { usePunchline } from '@/hooks/usePunchline';
import { PUNCHLINES } from '@/lib/punchlines';

interface DefendPanelProps {
  disabled: boolean;
  disabledReason?: string;
}

export default function DefendPanel({ disabled, disabledReason }: DefendPanelProps) {
  const [soldiers, setSoldiers] = useState(1);
  const { connected } = useWallet();
  const { defend, sending } = useGameActions();
  const punchline = usePunchline(PUNCHLINES.defendPanel);

  const handleDefend = async () => {
    if (disabled) return;
    try {
      await defend(soldiers);
      setSoldiers(1);
    } catch {
      // Error handled in useGameActions
    }
  };

  const isDisabled = disabled || !connected || sending;
  const quickValues = [1, 5, 10];

  return (
    <div className={`bg-defend/5 border border-defend/20 rounded-xl p-4 ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        <Shield size={18} className="text-defend-light" />
        <h3 className="font-cinzel font-bold text-defend-light">Defend</h3>
      </div>
      <p className="text-xs text-gray-400 mb-3">{punchline}</p>

      {/* Soldier Input */}
      <div className="flex items-center gap-2 mb-3">
        <input
          type="number"
          min={GAME_CONSTANTS.MIN_SOLDIERS}
          max={GAME_CONSTANTS.MAX_SOLDIERS}
          value={soldiers}
          onChange={(e) => setSoldiers(Math.min(GAME_CONSTANTS.MAX_SOLDIERS, Math.max(GAME_CONSTANTS.MIN_SOLDIERS, parseInt(e.target.value) || 1)))}
          disabled={isDisabled}
          className="w-16 bg-royal-midnight border border-defend/30 rounded-lg px-2 py-2 text-center text-defend-light font-bold focus:outline-none focus:border-defend"
        />
        <span className="text-sm text-gray-400">soldiers</span>
      </div>

      {/* Quick Select */}
      <div className="flex gap-2 mb-3">
        {quickValues.map((val) => (
          <button
            key={val}
            onClick={() => setSoldiers(val)}
            disabled={isDisabled}
            className={`flex-1 py-1 rounded text-sm font-bold transition-colors ${
              soldiers === val
                ? 'bg-defend text-white'
                : 'bg-defend/10 text-defend-light hover:bg-defend/20'
            } disabled:cursor-not-allowed`}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Defend Button */}
      <button
        onClick={handleDefend}
        disabled={isDisabled}
        className="w-full py-3 rounded-lg font-cinzel font-bold text-white bg-gradient-to-r from-defend-dark to-defend hover:from-defend to-defend-light transition-all disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : !connected ? 'Connect Wallet' : `Send ${soldiers} Defender${soldiers > 1 ? 's' : ''}`}
      </button>

      {/* Disabled Reason */}
      {disabled && disabledReason && (
        <p className="text-xs text-gray-400 mt-2 text-center italic">{disabledReason}</p>
      )}
    </div>
  );
}
