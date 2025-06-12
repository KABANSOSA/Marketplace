'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
} 