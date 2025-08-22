import './globals.css';
import type { Metadata } from 'next';
import { Inter, Sora, JetBrains_Mono } from 'next/font/google';

import Navigation from '@/components/Navigation';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';
import { Analytics } from '@vercel/analytics/react'
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const sora = Sora({ 
  subsets: ['latin'],
  variable: '--font-display',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description: 'An immersive portfolio experience showcasing cutting-edge web development and creative coding.',
  keywords: 'portfolio, web developer, creative coding, animation, React, Next.js',
  authors: [{ name: 'Creative Developer' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        
          <ScrollProgress />
          <Navigation />
          <CustomCursor />
          <main>{children}</main>
          <Analytics />
      </body>
    </html>
  );
}
