import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hot Crown — Bid, Battle, Burn',
  description: 'Bid for the throne. Attack the king or defend him. Every move burns tokens. The crown is hot — hold it if you can. A Solana on-chain game.',
  metadataBase: new URL('https://hotcrown.io'),
  keywords: ['solana', 'game', 'defi', 'token', 'burn', 'crown', 'battle', 'bid', 'on-chain'],
  openGraph: {
    title: 'Hot Crown — Bid, Battle, Burn',
    description: 'Bid for the throne. Attack the king or defend him. Every move burns tokens. The crown is hot — hold it if you can.',
    siteName: 'Hot Crown',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hot Crown — Bid, Battle, Burn',
    description: 'Bid for the throne. Attack the king or defend him. Every move burns tokens. A Solana on-chain game.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${cinzel.variable} ${inter.variable} font-inter antialiased bg-royal-midnight text-foreground min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
