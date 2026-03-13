'use client';

import { useState, useEffect, useCallback } from 'react';

interface CountdownResult {
  timeLeft: number;       // ms remaining
  minutes: number;
  seconds: number;
  isExpired: boolean;
  isUrgent: boolean;      // < 30 seconds
  display: string;        // "MM:SS"
}

export function useCountdown(deadline: number | null): CountdownResult {
  const calcTimeLeft = useCallback(() => {
    if (!deadline) return 0;
    return Math.max(0, deadline - Date.now());
  }, [deadline]);

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    if (!deadline) return;

    const interval = setInterval(() => {
      const remaining = calcTimeLeft();
      setTimeLeft(remaining);
      if (remaining <= 0) clearInterval(interval);
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline, calcTimeLeft]);

  const totalSeconds = Math.ceil(timeLeft / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return {
    timeLeft,
    minutes,
    seconds,
    isExpired: deadline !== null && timeLeft <= 0,
    isUrgent: timeLeft > 0 && timeLeft < 30_000,
    display: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
  };
}
