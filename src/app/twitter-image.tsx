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
        <div style={{ fontSize: 100, marginBottom: 16, display: 'flex' }}>
          👑
        </div>
        <div
          style={{
            fontSize: 64,
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
        <div
          style={{
            fontSize: 28,
            color: '#E8E4F0',
            marginTop: 12,
            display: 'flex',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Bid · Battle · Burn
        </div>
        <div
          style={{
            fontSize: 20,
            color: '#9CA3AF',
            marginTop: 20,
            display: 'flex',
            textAlign: 'center',
            maxWidth: 650,
          }}
        >
          Claim the throne. Defend or dethrone the king. Every move burns tokens. A Solana game.
        </div>
      </div>
    ),
    { ...size }
  );
}
