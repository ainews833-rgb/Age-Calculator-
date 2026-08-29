import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/lib/theme-provider';

export const metadata: Metadata = {
  title: 'Age Calculator Pro - Calculate Your Exact Age & Birthday Countdown',
  description: 'Calculate your exact age in years, months, days and more. Find your next birthday, date difference, age milestones and detailed age statistics with our free age calculator.',
  openGraph: {
    title: 'Age Calculator Pro - Calculate Your Exact Age & Birthday Countdown',
    description: 'Calculate your exact age in years, months, days and more. Find your next birthday, date difference, age milestones and detailed age statistics with our free age calculator.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Age Calculator Pro - Calculate Your Exact Age & Birthday Countdown',
    description: 'Calculate your exact age in years, months, days and more. Find your next birthday, date difference, age milestones and detailed age statistics with our free age calculator.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body suppressHydrationWarning className="antialiased bg-[#09090b] text-[#fafafa] selection:bg-indigo-500 selection:text-white">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

