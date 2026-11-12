import './globals.css';
import { ReactNode } from 'react';
import { GoogleAdSense } from '../components/GoogleAdSense';

export const metadata = {
  title: 'Rang & Riwaayat — Celebrate Every Tradition',
  description: "India's Festivals, Culture, Stories, Food, Traditions and Celebrations.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#8F3026" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-ivory-light text-charcoal font-sans antialiased selection:bg-vermilion selection:text-ivory-light">
        <GoogleAdSense />
        {children}
      </body>
    </html>
  );
}
