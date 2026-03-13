import Image from 'next/image';
import TokenAmount from '@/components/common/TokenAmount';

interface ArmyDisplayProps {
  attackArmy: number;
  defenseArmy: number;
  attackPool: number;
  defensePool: number;
}

export default function ArmyDisplay({ attackArmy, defenseArmy, attackPool, defensePool }: ArmyDisplayProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Attack Column */}
      <div className="bg-attack/5 border border-attack/20 rounded-xl overflow-hidden">
        <div className="relative h-32 w-full">
          <Image
            src="/army_attacking.png"
            alt="Attack army"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-royal-midnight/60 to-transparent" />
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p className="text-xs text-gray-300 uppercase tracking-wider">Attackers</p>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-4xl font-bold text-attack-light font-inter">
            {attackArmy}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">soldiers</p>
          <div className="mt-3 pt-3 border-t border-attack/20">
            <p className="text-xs text-gray-500">Pool</p>
            <TokenAmount amount={attackPool} className="text-sm text-attack-light" />
          </div>
        </div>
      </div>

      {/* Defense Column */}
      <div className="bg-defend/5 border border-defend/20 rounded-xl overflow-hidden">
        <div className="relative h-32 w-full">
          <Image
            src="/army_defending.png"
            alt="Defense army"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-royal-midnight via-royal-midnight/60 to-transparent" />
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p className="text-xs text-gray-300 uppercase tracking-wider">Defenders</p>
          </div>
        </div>
        <div className="p-4 text-center">
          <p className="text-4xl font-bold text-defend-light font-inter">
            {defenseArmy}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">soldiers</p>
          <div className="mt-3 pt-3 border-t border-defend/20">
            <p className="text-xs text-gray-500">Pool</p>
            <TokenAmount amount={defensePool} className="text-sm text-defend-light" />
          </div>
        </div>
      </div>
    </div>
  );
}
