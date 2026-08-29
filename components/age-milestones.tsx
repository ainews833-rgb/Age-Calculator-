'use client';

import React, { useState } from 'react';
import {
  AgeCalculationResult,
  calculateMilestones,
  formatMediumDate,
  formatNumber,
} from '@/lib/date-utils';
import {
  Flag,
  Calendar,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Trophy,
} from 'lucide-react';

interface AgeMilestonesProps {
  result: AgeCalculationResult;
}

export function AgeMilestones({ result }: AgeMilestonesProps) {
  const [showPast, setShowPast] = useState(false);
  const milestoneList = [1, 5, 10, 13, 16, 18, 20, 21, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100];
  
  const { upcoming, past } = calculateMilestones(
    result.birthParts,
    result.targetDate,
    milestoneList
  );

  return (
    <div
      id="milestones"
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Coming Age Milestones
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-zinc-400 mt-0.5">
            Key life chapters, landmark birthdays, and exact countdowns
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60 self-start sm:self-auto">
          {upcoming.length} Upcoming Milestones
        </span>
      </div>

      {/* Upcoming Milestones Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-6">
        {upcoming.map((m, idx) => (
          <div
            key={m.age}
            className={`p-4 rounded-xl border transition-all flex flex-col justify-between ${
              idx === 0
                ? 'bg-gradient-to-br from-indigo-50 via-slate-50 to-white dark:from-indigo-950/40 dark:via-zinc-900 dark:to-slate-900 border-indigo-300 dark:border-indigo-500/50 shadow-md ring-1 ring-indigo-500/20 dark:ring-indigo-500/30'
                : 'bg-slate-50 dark:bg-zinc-900/60 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-xs">
                  Age {m.age}
                </span>
                {idx === 0 && (
                  <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800/60 px-2 py-0.5 rounded-full">
                    Next Major
                  </span>
                )}
              </div>

              <span className="block text-base font-bold text-slate-900 dark:text-white">
                {formatMediumDate(m.date)}
              </span>
              <span className="text-xs text-slate-500 dark:text-zinc-400">
                {m.dayOfWeek}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {m.yearsDiff > 0 && `${m.yearsDiff}y `}
                {m.monthsDiff > 0 && `${m.monthsDiff}m `}
                {m.daysDiff}d remaining
              </span>
              <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                ({formatNumber(m.totalDaysDiff)} days)
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Past Milestones Collapsible */}
      {past.length > 0 && (
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-zinc-800">
          <button
            type="button"
            onClick={() => setShowPast(!showPast)}
            className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 text-sm font-bold text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800/80 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Past Achieved Milestones ({past.length})
            </span>
            {showPast ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showPast && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 animate-fadeIn">
              {past.map((m) => (
                <div
                  key={m.age}
                  className="p-3.5 rounded-xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 flex items-start justify-between gap-2 shadow-xs"
                >
                  <div>
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Age {m.age} Milestone
                    </span>
                    <span className="block text-sm font-semibold text-slate-800 dark:text-zinc-200 mt-0.5">
                      {formatMediumDate(m.date)}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                      {m.dayOfWeek}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-zinc-400 text-right">
                    {m.yearsDiff > 0 ? `${m.yearsDiff} yrs ago` : `${m.daysDiff} days ago`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
