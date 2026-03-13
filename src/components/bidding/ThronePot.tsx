import TokenAmount from '@/components/common/TokenAmount';

interface ThronePotProps {
  amount: number;
}

export default function ThronePot({ amount }: ThronePotProps) {
  return (
    <div className="bg-gradient-to-b from-crown-gold/10 to-transparent border border-crown-gold/20 rounded-xl p-6 text-center">
      <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Throne Pot</p>
      <TokenAmount amount={amount} className="text-3xl text-crown-gold" />
    </div>
  );
}
