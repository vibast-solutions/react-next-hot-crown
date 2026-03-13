'use client';

import { useGameContext } from '@/context/GameContext';

export function useGameState() {
  const { state, dispatch, loadPreset } = useGameContext();
  return { state, dispatch, loadPreset };
}
