'use client';

import { useGameContext } from '@/context/GameContext';

export function useGameState() {
  const { state, refresh, loading, error } = useGameContext();
  return { state, refresh, loading, error };
}
