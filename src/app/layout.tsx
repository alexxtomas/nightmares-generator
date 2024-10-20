import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Link from 'next/link';
import { Toaster } from '@components/ui/toaster';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'WorstNightmareAI',
  description: 'Generate your worst nightmare with AI!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-w-6xl mx-auto dark`}
      >
        <header className="py-8">
          <Link href={'/'}>
            <h1 className="text-4xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-orange-500 to-orange-400 animate-gradient-x tracking-wider animate-pulse">
              Nightmare AI
            </h1>
          </Link>
        </header>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
