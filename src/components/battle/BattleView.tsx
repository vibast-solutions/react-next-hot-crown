'use client';

import { useGameContext } from '@/context/GameContext';
import { useGameActions } from '@/hooks/useGameActions';
import { useCountdown } from '@/hooks/useCountdown';
import { useWallet } from '@solana/wallet-adapter-react';
import Timer from '@/components/common/Timer';
import KingDisplay from './KingDisplay';
import ArmyDisplay from './ArmyDisplay';
import BattleVisual from './BattleVisual';
import AttackPanel from './AttackPanel';
import DefendPanel from './DefendPanel';

export default function BattleView() {
  const { state } = useGameContext();
  const { finalizeBattle, sending } = useGameActions();
  const { connected } = useWallet();
  const { battle } = state;
  const { isExpired } = useCountdown(battle.deadline);

  const attackLeading = battle.attackArmy > battle.defenseArmy;
  const defenseLeading = battle.defenseArmy > battle.attackArmy;
  const tied = battle.attackArmy === battle.defenseArmy && battle.attackArmy > 0;

  const attackPanelDisabled = battle.isBattleActive && attackLeading && !tied;
  const defendPanelDisabled = battle.isBattleActive && defenseLeading && !tied;

  const attackPanelReason = attackPanelDisabled
    ? 'Attack is already ahead — only defenders can act now'
    : undefined;
  const defendPanelReason = defendPanelDisabled
    ? 'Defense is already ahead — only attackers can act now'
    : undefined;

  const handleSettle = async () => {
    try {
      await finalizeBattle();
    } catch {
      // Error handled in useGameActions
    }
  };

  // Idle state — no battle active, show full king image + attack-only panel
  if (!battle.isBattleActive) {
    return (
      <div className="max-w-lg mx-auto space-y-6">
        <div className="bg-royal-midnight-light/50 border border-crown-gold/20 rounded-2xl p-6">
          <KingDisplay kingWallet={battle.kingWallet} isBattleActive={false} />
        </div>
        <p className="text-center text-sm text-gray-500">Send soldiers to start a battle</p>
        <AttackPanel disabled={false} />
      </div>
    );
  }

  // Active battle
  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* King */}
      <div className="bg-royal-midnight-light/50 border border-crown-gold/20 rounded-2xl p-4">
        <KingDisplay kingWallet={battle.kingWallet} isBattleActive={true} />
      </div>

      {/* Timer */}
      <div className="flex justify-center">
        <Timer deadline={battle.deadline} label="Battle ends in" />
      </div>

      {/* Battle Visual — Tug of War */}
      <BattleVisual attackArmy={battle.attackArmy} defenseArmy={battle.defenseArmy} />

      {/* Army Display */}
      <ArmyDisplay
        attackArmy={battle.attackArmy}
        defenseArmy={battle.defenseArmy}
        attackPool={battle.attackPool}
        defensePool={battle.defensePool}
      />

      {/* Settle or Action Panels */}
      {isExpired ? (
        <button
          onClick={handleSettle}
          disabled={!connected || sending}
          className="w-full py-4 rounded-xl font-cinzel text-lg font-bold bg-gradient-to-r from-crown-ember to-crown-flame text-white shadow-lg shadow-crown-ember/30 hover:shadow-crown-flame/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? 'Settling...' : 'Settle Battle'}
        </button>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <AttackPanel disabled={attackPanelDisabled} disabledReason={attackPanelReason} />
          <DefendPanel disabled={defendPanelDisabled} disabledReason={defendPanelReason} />
        </div>
      )}
    </div>
  );
}
