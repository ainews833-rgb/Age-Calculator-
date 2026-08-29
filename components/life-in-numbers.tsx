'use client';

import React from 'react';
import { AgeCalculationResult, formatNumber } from '@/lib/date-utils';
import { calculateLifeStats } from '@/lib/zodiac-utils';
import {
  Heart,
  Wind,
  Moon,
  Globe2,
  Sparkles,
  Info,
  Flame,
  Eye,
  Compass,
} from 'lucide-react';

interface LifeInNumbersProps {
  result: AgeCalculationResult;
}

export function LifeInNumbers({ result }: LifeInNumbersProps) {
  const stats = calculateLifeStats(result.totalDays);

  return (
    <div
      id="life-stats"
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Your Life in Numbers
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
            Biological milestones and cosmic journey since the day you were born
          </p>
        </div>
      </div>

      {/* Grid of Life Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Heartbeats */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 dark:bg-rose-950/60 dark:border-rose-800/50 dark:text-rose-400 flex items-center justify-center flex-shrink-0">
            <Heart className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Estimated Heartbeats
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              ~{formatNumber(stats.heartbeats)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Beating ~75-80 times per minute
            </span>
          </div>
        </div>

        {/* Breaths Taken */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 text-cyan-600 dark:bg-cyan-950/60 dark:border-cyan-800/50 dark:text-cyan-400 flex items-center justify-center flex-shrink-0">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Breaths Taken
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              ~{formatNumber(stats.breaths)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Avg. 16 breaths each minute
            </span>
          </div>
        </div>

        {/* Sleep Duration */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200 text-violet-600 dark:bg-violet-950/60 dark:border-violet-800/50 dark:text-violet-400 flex items-center justify-center flex-shrink-0">
            <Moon className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Time Spent Sleeping
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {formatNumber(stats.sleepDays)} days
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              ~{formatNumber(stats.sleepHours)} total resting hours (1/3 of life)
            </span>
          </div>
        </div>

        {/* Cosmic Journey / Distance */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 text-amber-600 dark:bg-amber-950/60 dark:border-amber-800/50 dark:text-amber-400 flex items-center justify-center flex-shrink-0">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Space Journey Traveled
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {formatNumber(stats.cosmicDistanceMillionKm)} M km
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Cruising through solar orbit with Earth
            </span>
          </div>
        </div>

        {/* Solar Orbits */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 dark:bg-emerald-950/60 dark:border-emerald-800/50 dark:text-emerald-400 flex items-center justify-center flex-shrink-0">
            <Globe2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Sun Orbits Completed
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              {stats.orbitsSun} Orbits
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Full 360° planetary revolutions
            </span>
          </div>
        </div>

        {/* Eye Blinks */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 flex items-start gap-3.5 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-600 dark:bg-indigo-950/60 dark:border-indigo-800/50 dark:text-indigo-400 flex items-center justify-center flex-shrink-0">
            <Eye className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">
              Estimated Eye Blinks
            </span>
            <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">
              ~{formatNumber(stats.blinks)}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              Keeping your vision refreshed
            </span>
          </div>
        </div>
      </div>

      {/* Mandatory Accuracy & Calculation Disclaimer */}
      <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 text-xs text-slate-600 dark:text-zinc-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-slate-900 dark:text-zinc-300">Calculation Note:</strong> Time-based totals are calculated from calendar dates and may vary depending on the exact interpretation of elapsed time. For seconds, minutes, and hours, calculations reflect standard calendar-day intervals (24 hours per calendar day) unless an exact birth time was specified in the calculator. Biological and cosmic statistics are scientific estimations based on global demographic averages.
        </p>
      </div>
    </div>
  );
}
