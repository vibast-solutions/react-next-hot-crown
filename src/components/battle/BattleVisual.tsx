interface BattleVisualProps {
  attackArmy: number;
  defenseArmy: number;
}

export default function BattleVisual({ attackArmy, defenseArmy }: BattleVisualProps) {
  const total = attackArmy + defenseArmy;

  if (total === 0) {
    return (
      <div className="w-full h-8 rounded-full bg-royal-purple/30 flex items-center justify-center">
        <span className="text-xs text-gray-500">No forces deployed</span>
      </div>
    );
  }

  const attackPercent = (attackArmy / total) * 100;
  const defensePercent = (defenseArmy / total) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-gray-400">
        <span className="text-attack-light">{attackPercent.toFixed(0)}% Attack</span>
        <span className="text-defend-light">{defensePercent.toFixed(0)}% Defense</span>
      </div>
      <div className="w-full h-6 rounded-full overflow-hidden flex bg-royal-purple/30">
        <div
          className="bg-gradient-to-r from-attack-dark to-attack h-full transition-all duration-500"
          style={{ width: `${attackPercent}%` }}
        />
        <div
          className="bg-gradient-to-r from-defend to-defend-dark h-full transition-all duration-500"
          style={{ width: `${defensePercent}%` }}
        />
      </div>
    </div>
  );
}
