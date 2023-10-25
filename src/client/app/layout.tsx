import './globals.css';
import type { Metadata } from 'next';
import React from 'react';
import PartialNav from '@/app/components/partial/nav';

export const metadata: Metadata = {
  title: 'Train Schedule',
  description: 'Train Schedule Client',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PartialNav />
        {children}
      </body>
    </html>
  );
}
