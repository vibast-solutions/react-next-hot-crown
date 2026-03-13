'use client';

import { useCallback, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { PublicKey } from '@solana/web3.js';
import { BN } from '@coral-xyz/anchor';
import {
  getAssociatedTokenAddress,
  TOKEN_2022_PROGRAM_ID,
} from '@solana/spl-token';
import { useProgram } from './useProgram';
import { useGameContext } from '@/context/GameContext';
import { PROGRAM_ID, TOKEN_MINT, DEV_WALLET_ATA, GAME_STATE_SEED } from '@/lib/constants';

export function useGameActions() {
  const { program, connection } = useProgram();
  const { publicKey } = useWallet();
  const { refresh } = useGameContext();
  const [sending, setSending] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);

  const getGameAccounts = useCallback(async () => {
    const [gameStatePda] = PublicKey.findProgramAddressSync(
      [GAME_STATE_SEED],
      PROGRAM_ID
    );
    const throneVault = await getAssociatedTokenAddress(
      TOKEN_MINT,
      gameStatePda,
      true,
      TOKEN_2022_PROGRAM_ID
    );
    return { gameStatePda, throneVault };
  }, []);

  const execute = useCallback(async (fn: () => Promise<string>) => {
    setSending(true);
    setTxError(null);
    try {
      const sig = await fn();
      // Wait for confirmation then refresh state
      await connection.confirmTransaction(sig, 'confirmed');
      await refresh();
      return sig;
    } catch (e: any) {
      const msg = e?.message || 'Transaction failed';
      // Parse Anchor errors
      const anchorMatch = msg.match(/Error Message: (.+)/);
      setTxError(anchorMatch ? anchorMatch[1] : msg);
      throw e;
    } finally {
      setSending(false);
    }
  }, [connection, refresh]);

  const placeBid = useCallback(async () => {
    if (!program || !publicKey) return;
    const { gameStatePda, throneVault } = await getGameAccounts();
    const bidderTokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, publicKey, false, TOKEN_2022_PROGRAM_ID);

    return execute(() =>
      program.methods
        .placeThroneBid()
        .accountsStrict({
          bidder: publicKey,
          gameState: gameStatePda,
          bidderTokenAccount,
          throneVault,
          devWalletAta: DEV_WALLET_ATA,
          tokenMint: TOKEN_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    );
  }, [program, publicKey, getGameAccounts, execute]);

  const attack = useCallback(async (soldiers: number) => {
    if (!program || !publicKey) return;
    const { gameStatePda, throneVault } = await getGameAccounts();
    const attackerTokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, publicKey, false, TOKEN_2022_PROGRAM_ID);

    return execute(() =>
      program.methods
        .attack(new BN(soldiers))
        .accountsStrict({
          attacker: publicKey,
          gameState: gameStatePda,
          attackerTokenAccount,
          throneVault,
          devWalletAta: DEV_WALLET_ATA,
          tokenMint: TOKEN_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    );
  }, [program, publicKey, getGameAccounts, execute]);

  const defend = useCallback(async (soldiers: number) => {
    if (!program || !publicKey) return;
    const { gameStatePda, throneVault } = await getGameAccounts();
    const defenderTokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, publicKey, false, TOKEN_2022_PROGRAM_ID);

    return execute(() =>
      program.methods
        .defend(new BN(soldiers))
        .accountsStrict({
          defender: publicKey,
          gameState: gameStatePda,
          defenderTokenAccount,
          throneVault,
          devWalletAta: DEV_WALLET_ATA,
          tokenMint: TOKEN_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    );
  }, [program, publicKey, getGameAccounts, execute]);

  const finalizeKingElection = useCallback(async () => {
    if (!program || !publicKey) return;
    const { gameStatePda, throneVault } = await getGameAccounts();

    // Fetch on-chain state to get candidate
    const raw = await (program.account as any).gameState.fetch(gameStatePda);
    const candidateKey = raw.candidate as PublicKey;
    const kingTokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, candidateKey, false, TOKEN_2022_PROGRAM_ID);

    return execute(() =>
      program.methods
        .finalizeKingElection()
        .accountsStrict({
          anyone: publicKey,
          gameState: gameStatePda,
          throneVault,
          kingTokenAccount,
          tokenMint: TOKEN_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    );
  }, [program, publicKey, getGameAccounts, execute]);

  const finalizeBattle = useCallback(async () => {
    if (!program || !publicKey) return;
    const { gameStatePda, throneVault } = await getGameAccounts();

    // Fetch on-chain state to get king
    const raw = await (program.account as any).gameState.fetch(gameStatePda);
    const kingKey = raw.king as PublicKey;
    const kingTokenAccount = await getAssociatedTokenAddress(TOKEN_MINT, kingKey, false, TOKEN_2022_PROGRAM_ID);

    return execute(() =>
      program.methods
        .finalizeBattle()
        .accountsStrict({
          anyone: publicKey,
          gameState: gameStatePda,
          throneVault,
          kingTokenAccount,
          tokenMint: TOKEN_MINT,
          tokenProgram: TOKEN_2022_PROGRAM_ID,
        })
        .rpc()
    );
  }, [program, publicKey, getGameAccounts, execute]);

  return {
    placeBid,
    attack,
    defend,
    finalizeKingElection,
    finalizeBattle,
    sending,
    txError,
    clearError: () => setTxError(null),
  };
}
