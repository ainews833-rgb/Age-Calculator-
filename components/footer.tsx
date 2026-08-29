'use client';

import React from 'react';
import { Calendar, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="no-print border-t border-slate-200 dark:border-zinc-800/90 bg-slate-100/90 dark:bg-[#18181b]/90 mt-16 py-12 transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Purpose */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-indigo-600 text-white font-black text-base shadow-md shadow-indigo-500/25">
                A
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Age Calculator <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              The high-precision Gregorian calendar age calculator. Accurately accounts for leap years, varying month lengths, time-of-birth precision, and cosmic journey metrics.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-zinc-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Zero tracking • 100% Client-side privacy</span>
            </div>
          </div>

          {/* Col 2: Navigation Utilities */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Tools & Features
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <a href="#calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Exact Age Calculator
                </a>
              </li>
              <li>
                <a href="#birthday-countdown" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Birthday Countdown
                </a>
              </li>
              <li>
                <a href="#date-difference" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Date Difference Calculator
                </a>
              </li>
              <li>
                <a href="#birthday-calc" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Dedicated Birthday Tool
                </a>
              </li>
              <li>
                <a href="#milestones" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Age Milestones
                </a>
              </li>
              <li>
                <a href="#life-stats" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Life in Numbers
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Reference & Legal */}
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Accuracy & Help
            </span>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-zinc-400">
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Gregorian Algorithm FAQ
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Leap-Year Rules (Feb 29)
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Time-of-Birth Precision
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-zinc-400">
          <p>© {currentYear} Age Calculator Pro. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with mathematical precision & care.
          </p>
        </div>
      </div>
    </footer>
  );
}
