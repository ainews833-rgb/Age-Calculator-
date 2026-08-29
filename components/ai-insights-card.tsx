'use client';

import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, AlertCircle, Quote } from 'lucide-react';
import { DateParts, MONTH_NAMES } from '@/lib/date-utils';

interface AiInsightsCardProps {
  birthParts: DateParts;
  years: number;
}

export function AiInsightsCard({ birthParts, years }: AiInsightsCardProps) {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsight = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          birthYear: birthParts.year,
          birthMonth: birthParts.month,
          birthDay: birthParts.day,
          currentAge: years,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await res.json();
      setInsight(data.insight);
    } catch (err: unknown) {
      setError(
        'Unable to load AI insights at the moment. The core age calculations remain completely accurate and unaffected.'
      );
    } finally {
      setLoading(false);
    }
  };

  const monthName = MONTH_NAMES[birthParts.month - 1] || 'Month';

  return (
    <div className="bg-[#18181b] rounded-2xl shadow-2xl border border-zinc-800/90 p-5 sm:p-8 max-w-4xl mx-auto mt-8 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-zinc-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-violet-400" />
            AI Historical & Life Era Insights
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Discover what was happening in the world when you were born ({monthName} {birthParts.day}, {birthParts.year})
          </p>
        </div>

        {!insight && !loading && (
          <button
            type="button"
            onClick={fetchInsight}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-violet-500/20 transition-all self-start sm:self-auto"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate Era Insights
          </button>
        )}
      </div>

      {loading && (
        <div className="py-8 flex flex-col items-center justify-center text-center">
          <Loader2 className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
          <p className="text-sm font-semibold text-zinc-200">
            Uncovering world events and cultural snapshots from {birthParts.year}...
          </p>
          <span className="text-xs text-zinc-500 mt-1">Powered by server-side Gemini intelligence</span>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3.5 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {insight && (
        <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-violet-950/30 via-zinc-900 to-slate-900 border border-violet-800/60 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center gap-1.5">
              <Quote className="w-3.5 h-3.5" /> Era Snapshot for {birthParts.year}
            </span>
            <button
              onClick={fetchInsight}
              disabled={loading}
              title="Regenerate insights"
              className="text-xs font-medium text-zinc-400 hover:text-indigo-400 flex items-center gap-1"
            >
              <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </button>
          </div>

          <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-line">
            {insight}
          </p>
        </div>
      )}

      {!insight && !loading && (
        <div className="mt-4 text-center py-6 px-4 rounded-xl border border-dashed border-zinc-800 bg-[#09090b]">
          <p className="text-xs text-zinc-400">
            Click <strong className="text-zinc-200">Generate Era Insights</strong> above to explore cultural trends, major world moments, and milestone wisdom for someone born in {birthParts.year}.
          </p>
        </div>
      )}
    </div>
  );
}
