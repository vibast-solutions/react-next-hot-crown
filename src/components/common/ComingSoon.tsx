import Image from 'next/image';

export default function ComingSoon() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Throne image */}
      <div className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8">
        <Image
          src="/empty_throne.png"
          alt="The Empty Throne"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="font-cinzel text-4xl sm:text-5xl font-bold bg-gradient-to-r from-crown-gold-light to-crown-ember bg-clip-text text-transparent mb-4">
        Hot Crown
      </h1>

      {/* Tagline */}
      <p className="font-cinzel text-lg sm:text-xl text-crown-gold/80 tracking-widest uppercase mb-8">
        Bid &middot; Battle &middot; Burn
      </p>

      {/* Mystical coming soon text */}
      <div className="max-w-md space-y-4">
        <p className="text-gray-300 text-base leading-relaxed">
          The throne room is being prepared. Ancient contracts are being forged on the blockchain,
          and the Alchemist stirs in his chamber.
        </p>
        <p className="text-gray-400 text-sm italic leading-relaxed">
          Soon, the gates will open. Kings will rise, armies will clash, and tokens will burn
          like they were always meant to. The crown is almost ready — and it&apos;s already hot.
        </p>
      </div>

      {/* Subtle glow divider */}
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-crown-gold/40 to-transparent mt-10 mb-6" />

      {/* Solana badge */}
      <span className="text-xs text-crown-gold/50 tracking-wider uppercase">
        On-chain on Solana
      </span>
    </div>
  );
}
