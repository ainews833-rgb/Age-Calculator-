'use client';

import React from 'react';
import { HistoryItem } from '@/lib/history-storage';
import { formatMediumDate } from '@/lib/date-utils';
import {
  History,
  Trash2,
  Calendar,
  Clock,
  ArrowRight,
  Sparkles,
  X,
  BookmarkCheck,
} from 'lucide-react';

interface SavedHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

export function SavedHistory({
  history,
  onSelect,
  onDelete,
  onClearAll,
}: SavedHistoryProps) {
  if (history.length === 0) {
    return null;
  }

  return (
    <div
      id="saved-history"
      className="bg-white dark:bg-[#18181b] rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-2xl border border-slate-200/90 dark:border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-200 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200 dark:bg-indigo-950/80 dark:text-indigo-400 dark:border-indigo-800/60 flex items-center justify-center flex-shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Recent Calculation History
            </h2>
            <p className="text-xs text-slate-500 dark:text-zinc-400">
              Stored locally on your device for quick reference
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:border-rose-300 dark:hover:border-rose-900 transition-colors self-start sm:self-auto"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All History
        </button>
      </div>

      {/* History Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
        {history.map((item) => {
          const formattedSavedAt = new Date(item.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          });

          return (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[160px]">
                      {item.label || 'Saved Calculation'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    title="Delete record"
                    className="text-slate-400 dark:text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors p-1"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400">
                  {item.resultYears}y {item.resultMonths}m {item.resultDays}d
                </div>

                <div className="text-xs text-slate-600 dark:text-zinc-400 mt-1 flex flex-col gap-0.5">
                  <span>DOB: {formatMediumDate(new Date(item.birthParts.year, item.birthParts.month - 1, item.birthParts.day))}</span>
                  <span>Target: {formatMediumDate(new Date(item.targetParts.year, item.targetParts.month - 1, item.targetParts.day))}</span>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 dark:text-zinc-500">
                  {formattedSavedAt}
                </span>
                <button
                  type="button"
                  onClick={() => onSelect(item)}
                  className="text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-all"
                >
                  Load in Calc <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
