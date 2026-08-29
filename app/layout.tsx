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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var stored = localStorage.getItem('age_calc_pro_theme');
                var isDark = stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches) || (stored === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-slate-50 text-slate-900 dark:bg-[#09090b] dark:text-[#fafafa] selection:bg-indigo-500 selection:text-white transition-colors duration-200">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

