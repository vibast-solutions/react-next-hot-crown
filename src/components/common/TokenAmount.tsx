interface TokenAmountProps {
  amount: number;
  className?: string;
  showLabel?: boolean;
}

export default function TokenAmount({ amount, className = '', showLabel = true }: TokenAmountProps) {
  const formatted = amount.toLocaleString();

  return (
    <span className={`font-inter font-bold ${className}`}>
      {formatted}
      {showLabel && <span className="text-xs font-normal text-gray-400 ml-1">HCRN</span>}
    </span>
  );
}
