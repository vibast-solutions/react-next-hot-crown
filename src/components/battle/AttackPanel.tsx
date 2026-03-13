'use client';

import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useGameActions } from '@/hooks/useGameActions';
import { GAME_CONSTANTS } from '@/lib/constants';
import { Sword } from 'lucide-react';
import { usePunchline } from '@/hooks/usePunchline';
import { PUNCHLINES } from '@/lib/punchlines';

interface AttackPanelProps {
  disabled: boolean;
  disabledReason?: string;
}

export default function AttackPanel({ disabled, disabledReason }: AttackPanelProps) {
  const [soldiers, setSoldiers] = useState(1);
  const { connected } = useWallet();
  const { attack, sending } = useGameActions();
  const punchline = usePunchline(PUNCHLINES.attackPanel);

  const handleAttack = async () => {
    if (disabled) return;
    try {
      await attack(soldiers);
      setSoldiers(1);
    } catch {
      // Error handled in useGameActions
    }
  };

  const isDisabled = disabled || !connected || sending;
  const quickValues = [1, 5, 10];

  return (
    <div className={`bg-attack/5 border border-attack/20 rounded-xl p-4 ${isDisabled ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-2 mb-1">
        <Sword size={18} className="text-attack-light" />
        <h3 className="font-cinzel font-bold text-attack-light">Attack</h3>
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
          className="w-16 bg-royal-midnight border border-attack/30 rounded-lg px-2 py-2 text-center text-attack-light font-bold focus:outline-none focus:border-attack"
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
                ? 'bg-attack text-white'
                : 'bg-attack/10 text-attack-light hover:bg-attack/20'
            } disabled:cursor-not-allowed`}
          >
            {val}
          </button>
        ))}
      </div>

      {/* Attack Button */}
      <button
        onClick={handleAttack}
        disabled={isDisabled}
        className="w-full py-3 rounded-lg font-cinzel font-bold text-white bg-gradient-to-r from-attack-dark to-attack hover:from-attack to-attack-light transition-all disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed"
      >
        {sending ? 'Sending...' : !connected ? 'Connect Wallet' : `Send ${soldiers} Attacker${soldiers > 1 ? 's' : ''}`}
      </button>

      {/* Disabled Reason */}
      {disabled && disabledReason && (
        <p className="text-xs text-gray-400 mt-2 text-center italic">{disabledReason}</p>
      )}
    </div>
  );
}
