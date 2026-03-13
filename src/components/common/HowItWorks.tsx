'use client';

import { useState } from 'react';
import { HelpCircle, X, Crown, Sword, Shield, Coins } from 'lucide-react';

export default function HowItWorks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-royal-purple border border-royal-purple/40 rounded-full p-3 shadow-lg hover:bg-royal-purple-deep transition-colors"
        title="How it works"
      >
        <HelpCircle size={20} className="text-crown-gold-light" />
      </button>

      {/* Modal overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-royal-midnight-light border border-royal-purple/30 rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-royal-purple/20">
              <h2 className="font-cinzel text-xl text-crown-gold-light">How It Works</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-6">
              {/* Bidding */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Crown size={18} className="text-crown-gold" />
                  <h3 className="font-cinzel text-lg text-crown-gold-light">Claim the Throne</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 ml-6">
                  <li>When there&apos;s no king, anyone can bid for the throne.</li>
                  <li>Bids go up by 1 token each time: 1, 2, 3, 4...</li>
                  <li>Each bid resets a 3-minute timer.</li>
                  <li>If nobody outbids you before the timer runs out, you become king!</li>
                  <li>The king collects the entire throne pot.</li>
                </ul>
              </div>

              {/* Battle */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sword size={18} className="text-attack-light" />
                  <h3 className="font-cinzel text-lg text-attack-light">Attack the King</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 ml-6">
                  <li>Once a king exists, anyone can send soldiers to attack.</li>
                  <li>1 token = 1 soldier. Send 1 to 10 at a time.</li>
                  <li>Each action resets the 3-minute battle timer.</li>
                  <li>If attackers outnumber defenders when time runs out, the king falls.</li>
                </ul>
              </div>

              {/* Defend */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-defend-light" />
                  <h3 className="font-cinzel text-lg text-defend-light">Defend the King</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 ml-6">
                  <li>Anyone can defend the king by sending soldiers.</li>
                  <li>If defenders hold the line, the king survives and gets rewarded.</li>
                  <li>Defenders don&apos;t get paid — they&apos;re doing it for loyalty (or fun).</li>
                </ul>
              </div>

              {/* Turn restriction */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">⚔️</span>
                  <h3 className="font-cinzel text-lg text-gray-200">Turn Rules</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 ml-6">
                  <li>Only the losing side can send more soldiers.</li>
                  <li>If it&apos;s a tie, both sides can act.</li>
                  <li>This keeps battles competitive and prevents steamrolls.</li>
                </ul>
              </div>

              {/* Token flow */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Coins size={18} className="text-crown-ember" />
                  <h3 className="font-cinzel text-lg text-crown-ember">Where Do Tokens Go?</h3>
                </div>
                <ul className="text-sm text-gray-300 space-y-1.5 ml-6">
                  <li><span className="text-crown-gold-light">Throne bids:</span> 10% dev, 10% burned forever, 80% to the pot.</li>
                  <li><span className="text-crown-gold-light">Battle actions:</span> 10% dev, 90% into the battle pool.</li>
                  <li><span className="text-crown-gold-light">King survives:</span> King gets 50% of defense pool. Rest is burned.</li>
                  <li><span className="text-crown-gold-light">King falls:</span> Everything is burned. Back to bidding.</li>
                </ul>
              </div>

              {/* TL;DR */}
              <div className="bg-royal-purple/20 border border-royal-purple/30 rounded-xl p-4">
                <p className="font-cinzel text-sm text-crown-gold-light mb-2">TL;DR</p>
                <p className="text-sm text-gray-300">
                  Bid to become king. Collect the pot. Survive attacks to keep earning.
                  Get dethroned and it all burns. Every action burns tokens. The crown is hot — hold it if you can!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
