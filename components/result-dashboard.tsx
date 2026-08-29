'use client';

import React, { useState, useEffect } from 'react';
import {
  AgeCalculationResult,
  formatNumber,
  formatFullDate,
  formatDateToISO,
} from '@/lib/date-utils';
import {
  Share2,
  Copy,
  Printer,
  Bookmark,
  Check,
  Sparkles,
  Clock,
  Calendar,
  Layers,
  Activity,
  Award,
} from 'lucide-react';

interface ResultDashboardProps {
  result: AgeCalculationResult;
  onShare: () => void;
  onPrint: () => void;
  onSaveHistory: (label?: string) => void;
  isSavedInHistory: boolean;
}

export function ResultDashboard({
  result,
  onShare,
  onPrint,
  onSaveHistory,
  isSavedInHistory,
}: ResultDashboardProps) {
  const [copied, setCopied] = useState(false);
  const [secondsOffset, setSecondsOffset] = useState(0);
  const [customLabel, setCustomLabel] = useState('');
  const [showLabelInput, setShowLabelInput] = useState(false);

  // Live seconds ticker when calculating age relative to today
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsOffset((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [result]);

  const liveSeconds = result.totalSeconds + secondsOffset;

  const ageString = `${result.years} Years, ${result.months} Months, ${result.days} Days`;
  const summaryText = `I am ${result.years} years, ${result.months} months, and ${result.days} days old (${formatNumber(
    result.totalDays
  )} total days lived). Calculated via Age Calculator Pro.`;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(summaryText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  const handleSaveWithLabel = () => {
    onSaveHistory(customLabel);
    setShowLabelInput(false);
  };

  return (
    <div
      id="main-result"
      className="printable-area bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all animate-fadeIn"
    >
      {/* Primary Result Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 dark:from-indigo-950 dark:via-slate-900 dark:to-[#09090b] border border-indigo-400/30 dark:border-indigo-500/30 rounded-2xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-600/15 dark:shadow-2xl dark:shadow-indigo-950/50 text-center">
        {/* Subtle decorative glow circles */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 dark:bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-violet-400/15 dark:bg-violet-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-indigo-100 text-xs font-semibold uppercase tracking-wider mb-3 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-200" />
            Precise Calculation Result
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white drop-shadow-sm">
            {result.years} <span className="text-2xl sm:text-4xl font-normal text-indigo-200">Years</span>{' '}
            {result.months} <span className="text-2xl sm:text-4xl font-normal text-indigo-200">Months</span>{' '}
            {result.days} <span className="text-2xl sm:text-4xl font-normal text-indigo-200">Days</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base font-medium text-indigo-100 dark:text-zinc-300">
            Your exact age as of <span className="underline decoration-indigo-300 dark:decoration-indigo-400 font-semibold text-white">{formatFullDate(result.targetDate)}</span>
          </p>

          <p className="text-xs text-indigo-200 dark:text-zinc-400 mt-1">
            Born on {formatFullDate(result.birthDate)} ({result.dayOfWeekBorn})
          </p>
        </div>

        {/* Action Button Bar */}
        <div className="no-print mt-6 pt-5 border-t border-white/15 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <button
            onClick={onShare}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 backdrop-blur-xs active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            Share Result
          </button>

          <button
            onClick={handleCopy}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 backdrop-blur-xs active:scale-95"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Copy Summary'}
          </button>

          <button
            onClick={onPrint}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5 backdrop-blur-xs active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / PDF
          </button>

          {!isSavedInHistory ? (
            <button
              onClick={() => setShowLabelInput(!showLabelInput)}
              className="px-3.5 py-2 rounded-xl bg-white text-indigo-950 hover:bg-slate-100 text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <Bookmark className="w-4 h-4 text-indigo-600" />
              Save to History
            </button>
          ) : (
            <span className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-300" />
              Saved in History
            </span>
          )}
        </div>

        {/* Optional Label Prompt for saving */}
        {showLabelInput && !isSavedInHistory && (
          <div className="no-print mt-3 pt-3 flex items-center justify-center gap-2 max-w-sm mx-auto">
            <input
              type="text"
              placeholder="Tag name (e.g. Me, Dad, Alice)"
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              className="px-3 py-1.5 text-xs bg-black/40 border border-white/30 text-white rounded-lg placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white flex-1"
            />
            <button
              onClick={handleSaveWithLabel}
              className="px-3 py-1.5 text-xs bg-white text-indigo-950 font-bold rounded-lg hover:bg-slate-100"
            >
              Confirm Save
            </button>
          </div>
        )}
      </div>

      {/* Grid of Age Breakdown & Total Units */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card: Exact Age Breakdown */}
        <div className="bg-slate-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Age Breakdown
            </h3>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white dark:bg-[#09090b] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {result.years}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Years
              </span>
            </div>
            <div className="bg-white dark:bg-[#09090b] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-violet-600 dark:text-violet-400">
                {result.months}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Months
              </span>
            </div>
            <div className="bg-white dark:bg-[#09090b] p-4 rounded-xl border border-slate-200 dark:border-zinc-800 text-center shadow-xs">
              <span className="block text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                {result.days}
              </span>
              <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400">
                Days
              </span>
            </div>
          </div>

          {/* Additional precision row */}
          <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs text-slate-600 dark:text-zinc-400 px-1">
            <span>Decimal Years: <strong className="text-slate-900 dark:text-white">{result.decimalYears}</strong></span>
            <span>Decimal Months: <strong className="text-slate-900 dark:text-white">{result.decimalMonths}</strong></span>
          </div>
        </div>

        {/* Card: Total Time Lived */}
        <div className="bg-slate-50 dark:bg-zinc-900/60 p-5 rounded-2xl border border-slate-200 dark:border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Total Time Lived
              </h3>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-800/80 flex items-center gap-1">
              <Clock className="w-3 h-3 animate-spin text-emerald-600 dark:text-emerald-400" /> Live Ticker
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <div className="bg-white dark:bg-[#09090b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {formatNumber(result.totalMonthsApprox)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                Total Months
              </span>
            </div>

            <div className="bg-white dark:bg-[#09090b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {formatNumber(result.totalWeeks)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                Total Weeks
              </span>
            </div>

            <div className="bg-white dark:bg-[#09090b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {formatNumber(result.totalDays)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                Total Days
              </span>
            </div>

            <div className="bg-white dark:bg-[#09090b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {formatNumber(result.totalHours)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                Total Hours
              </span>
            </div>

            <div className="bg-white dark:bg-[#09090b] p-3 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xs">
              <span className="block text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {formatNumber(result.totalMinutes)}
              </span>
              <span className="text-[11px] font-medium text-slate-500 dark:text-zinc-400">
                Total Minutes
              </span>
            </div>

            <div className="bg-indigo-50 border border-indigo-200 dark:bg-indigo-950/40 dark:border-indigo-800/80 p-3 rounded-xl shadow-xs">
              <span className="block text-base sm:text-lg font-extrabold text-indigo-600 dark:text-indigo-400">
                {formatNumber(liveSeconds)}
              </span>
              <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-300">
                Total Seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
