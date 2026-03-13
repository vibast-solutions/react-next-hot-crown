'use client';

import { useState } from 'react';
import { useGameContext } from '@/context/GameContext';
import { MOCK_STATE_KEYS } from '@/lib/mockData';
import { Settings } from 'lucide-react';

export default function DevToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { loadPreset } = useGameContext();

  const labels: Record<string, string> = {
    freshBidding: 'Fresh Bidding',
    activeBidding: 'Active Bidding',
    idleBattle: 'Idle Battle',
    attackLeadingBattle: 'Attack Leading',
    tiedBattle: 'Tied Battle',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen && (
        <div className="mb-2 bg-royal-purple-deep border border-royal-purple/40 rounded-xl p-3 shadow-xl min-w-[200px]">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Mock States</p>
          <div className="space-y-1">
            {MOCK_STATE_KEYS.map((key) => (
              <button
                key={key}
                onClick={() => loadPreset(key)}
                className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-royal-purple/30 hover:text-white transition-colors"
              >
                {labels[key] || key}
              </button>
            ))}
          </div>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-royal-purple border border-royal-purple/40 rounded-full p-3 shadow-lg hover:bg-royal-purple-deep transition-colors"
        title="Dev Toolbar"
      >
        <Settings size={20} className="text-gray-300" />
      </button>
    </div>
  );
}
