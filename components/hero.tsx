'use client';

import React from 'react';
import { Shield, Sparkles, CheckCircle2, Clock, CalendarDays } from 'lucide-react';

export function Hero() {
  return (
    <section className="text-center pt-8 pb-4 sm:pt-12 sm:pb-6 px-4 max-w-4xl mx-auto">
      {/* Trust pill */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs font-semibold text-zinc-300 mb-4 shadow-sm backdrop-blur-xs">
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Precision Gregorian Calendar & Leap-Year Engine</span>
      </div>

      {/* Main Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white mb-3 sm:mb-4">
        Calculate Your <span className="bg-gradient-to-r from-indigo-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">Exact Age</span>
      </h1>

      {/* Subheadline */}
      <p className="text-base sm:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-6 font-normal">
        Find your precise age in years, months, days, hours, minutes and seconds.
      </p>

      {/* Value Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-zinc-300">
        <span className="inline-flex items-center gap-1.5 bg-zinc-900/80 px-3.5 py-1.5 rounded-xl border border-zinc-800 shadow-sm backdrop-blur-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          Exact Calendar Arithmetic
        </span>
        <span className="inline-flex items-center gap-1.5 bg-zinc-900/80 px-3.5 py-1.5 rounded-xl border border-zinc-800 shadow-sm backdrop-blur-xs">
          <CalendarDays className="w-4 h-4 text-indigo-400" />
          Feb 29 Leap-Year Handling
        </span>
        <span className="inline-flex items-center gap-1.5 bg-zinc-900/80 px-3.5 py-1.5 rounded-xl border border-zinc-800 shadow-sm backdrop-blur-xs">
          <Shield className="w-4 h-4 text-blue-400" />
          100% Private (Client-Side)
        </span>
      </div>
    </section>
  );
}
