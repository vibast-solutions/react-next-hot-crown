'use client';

import { useState, useEffect } from 'react';

export function usePunchline(lines: readonly string[]): string {
  const [index, setIndex] = useState(() => Math.floor(Math.random() * lines.length));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        let next: number;
        do {
          next = Math.floor(Math.random() * lines.length);
        } while (next === prev && lines.length > 1);
        return next;
      });
    }, 30_000);

    return () => clearInterval(interval);
  }, [lines]);

  return lines[index];
}
