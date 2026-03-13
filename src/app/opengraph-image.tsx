import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const alt = 'Hot Crown — Bid, Battle, Burn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const imageData = await readFile(join(process.cwd(), 'public', 'empty_throne.png'));
  const base64 = `data:image/png;base64,${imageData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#0D0B1A',
        }}
      >
        {/* Throne image — centered, cropped */}
        <img
          src={base64}
          style={{
            position: 'absolute',
            top: '-200px',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '1000px',
            opacity: 0.4,
          }}
        />

        {/* Dark overlay for text readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background: 'linear-gradient(135deg, rgba(13,11,26,0.85) 0%, rgba(26,15,60,0.7) 40%, rgba(45,27,105,0.6) 100%)',
          }}
        />

        {/* Content */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'serif',
          }}
        >
          {/* Title */}
          <div
            style={{
              fontSize: 80,
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
              border: '1px solid rgba(212, 160, 23, 0.3)',
              borderRadius: 999,
              padding: '8px 20px',
            }}
          >
            On-chain on Solana
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
