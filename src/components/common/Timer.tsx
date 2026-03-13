'use client';

import { useCountdown } from '@/hooks/useCountdown';
import { Clock } from 'lucide-react';

interface TimerProps {
  deadline: number | null;
  onExpired?: () => void;
  label?: string;
}

export default function Timer({ deadline, label }: TimerProps) {
  const { display, isExpired, isUrgent } = useCountdown(deadline);

  if (!deadline) {
    return (
      <div className="flex items-center gap-2 text-gray-500">
        <Clock size={18} />
        <span className="font-inter text-sm">No timer active</span>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="flex items-center gap-2 text-crown-ember">
        <Clock size={18} />
        <span className="font-inter text-sm font-bold">Time expired!</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${isUrgent ? 'animate-timer-urgent' : ''}`}>
      <Clock size={18} className={isUrgent ? 'text-crown-flame' : 'text-crown-gold'} />
      <div>
        {label && <span className="text-xs text-gray-400 mr-2">{label}</span>}
        <span
          className={`font-inter text-lg font-bold tabular-nums ${
            isUrgent ? 'text-crown-flame' : 'text-crown-gold-light'
          }`}
        >
          {display}
        </span>
      </div>
    </div>
  );
}
