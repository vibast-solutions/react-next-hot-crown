interface GameStateBadgeProps {
  phase: 'bidding' | 'battle';
  isBattleActive: boolean;
}

export default function GameStateBadge({ phase, isBattleActive }: GameStateBadgeProps) {
  if (phase === 'bidding') {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crown-gold/20 text-crown-gold-light border border-crown-gold/30">
        Bidding
      </span>
    );
  }

  if (!isBattleActive) {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-crown-gold/20 text-crown-gold-light border border-crown-gold/30">
        Peace
      </span>
    );
  }

  return (
    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-attack/20 text-attack-light border border-attack/30">
      Battle
    </span>
  );
}
