import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Hot Crown — Bid, Battle, Burn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0D0B1A 0%, #1A0F3C 40%, #2D1B69 100%)',
          fontFamily: 'serif',
        }}
      >
        {/* Crown emoji as hero */}
        <div style={{ fontSize: 120, marginBottom: 20, display: 'flex' }}>
          👑
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            background: 'linear-gradient(90deg, #F0C040, #E8720C)',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'flex',
            letterSpacing: '-2px',
          }}
        >
          Hot Crown
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 32,
            color: '#E8E4F0',
            marginTop: 16,
            display: 'flex',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Bid · Battle · Burn
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 22,
            color: '#9CA3AF',
            marginTop: 24,
            display: 'flex',
            textAlign: 'center',
            maxWidth: 700,
          }}
        >
          Claim the throne. Defend or dethrone the king. Every move burns tokens.
        </div>

        {/* Solana badge */}
        <div
          style={{
            fontSize: 16,
            color: '#D4A017',
            marginTop: 40,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            border: '1px solid rgba(212, 160, 23, 0.3)',
            borderRadius: 999,
            padding: '8px 20px',
          }}
        >
          On-chain on Solana
        </div>
      </div>
    ),
    { ...size }
  );
}
